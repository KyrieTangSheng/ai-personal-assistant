import { Request, Response } from "express";
import { GetMessageHistoryByDialogueId, AddNewMessages, Message, DbMessage, ModelMessage, Part } from "../database/messages";
import { GetPendingEventsByUserId} from "../database/events";
import { GetUserDetailByUserId } from "../database/users";
import { AddNewDialogue } from "../database/dialogues";
import { SendMessageToModel } from "../services/chatbot-client";

export const InitiateNewDialogue = async(req: Request, res: Response) => {
    try{
        const pendingEvents = await GetPendingEventsByUserId(1); // to be modified about this userId=1
    
        const userDetail = await GetUserDetailByUserId(1); // to be modified about this userId=1

        //Turn the events into text to feed into chatbot prompt
        const eventText = pendingEvents?.map(e => {
            return `Event Description: ${e.description}, Time: ${e.time}, Importance: ${e.importance}`;
        }).join("\n");

        const prompt = `
            You are a personal assistant to help ${userDetail.username} manage his/her schedule. 
            Below I will give you his/her events. 
            You are responsible to answer his/her questions based on the below information I give you.
            ${eventText}
        `;
        
        const modelResponse = await SendMessageToModel([], prompt);

        //insert this new dialogue and corresponding message to the database
        const createdDialogue = await AddNewDialogue(1); // to be modified about this userId=1

        //insert the messages related to this dialogue to the database
        const newMessages = [];
        newMessages.push(
            {
                speaker_role: "user",
                user_id: 1, //to be modified
                content: prompt,
                dialogue_id: createdDialogue.id
            }
        );

        newMessages.push(
            {
                speaker_role: "model",
                user_id: 1, //to be modified
                content: modelResponse,
                dialogue_id: createdDialogue.id
            }
        );

        // add the new message to database
        const insertedNewMessages = await AddNewMessages(newMessages);

        res.status(200).json(createdDialogue);
    } catch (err) {
        console.log("Error creating new dialogue",err);
        res.status(500).json({error:err});
    }
}


export const ContinueExistingDialoauge = async(req: Request, res: Response) => {
    try{
        //get the required parameters from the request
        const dialogueId = req.body.dialogueId;
        const newMessage = req.body.content;

        //get message history of this dialogue from db
        const messageHistoryFromDb= await GetMessageHistoryByDialogueId(dialogueId);
        
        if(!messageHistoryFromDb){
            res.status(400).json({error: "No message history available"});
        } else {
            //construct a message history object to feed into 
            const messageHistoryToModel: ModelMessage[] = [];
            messageHistoryFromDb.map(msg => {
                messageHistoryToModel.push({role: msg.speaker_role, parts:[{text:msg.content}]});
            });
            
            //feed messages into the model
            const modelResponse = await SendMessageToModel(messageHistoryToModel,newMessage);

            //insert the messages related to this dialogue to the database
            const newMessages: Message[] = [];
            newMessages.push(
                {
                    speaker_role: "user",
                    user_id: 1, //to be modified
                    content: newMessage,
                    dialogue_id: dialogueId
                }
            );
            newMessages.push(
                {
                    speaker_role: "model",
                    user_id: 1, //to be modified
                    content: modelResponse,
                    dialogue_id: dialogueId
                }
            );

            //add new message to db
            const insertedNewMessages = await AddNewMessages(newMessages);

            //get message history of this dialogue from db
            const messageUpdatedHistory = (await GetMessageHistoryByDialogueId(dialogueId)).slice(2);

            res.status(200).json(messageUpdatedHistory);
        }
    } catch (err) {
        console.log("Error sending message", err);
        res.status(500).json({error: err});
    }
}