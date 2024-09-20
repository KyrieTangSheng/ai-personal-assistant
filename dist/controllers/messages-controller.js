"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinueExistingDialoauge = exports.InitiateNewDialogue = void 0;
const messages_1 = require("../database/messages");
const events_1 = require("../database/events");
const users_1 = require("../database/users");
const dialogues_1 = require("../database/dialogues");
const chatbot_client_1 = require("../services/chatbot-client");
const InitiateNewDialogue = async (req, res) => {
    try {
        const pendingEvents = await (0, events_1.GetPendingEventsByUserId)(1); // to be modified about this userId=1
        const userDetail = await (0, users_1.GetUserDetailByUserId)(1); // to be modified about this userId=1
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
        const modelResponse = await (0, chatbot_client_1.SendMessageToModel)([], prompt);
        //insert this new dialogue and corresponding message to the database
        const createdDialogue = await (0, dialogues_1.AddNewDialogue)(1); // to be modified about this userId=1
        //insert the messages related to this dialogue to the database
        const newMessages = [];
        newMessages.push({
            speaker_role: "user",
            user_id: 1, //to be modified
            content: prompt,
            dialogue_id: createdDialogue.id
        });
        newMessages.push({
            speaker_role: "model",
            user_id: 1, //to be modified
            content: modelResponse,
            dialogue_id: createdDialogue.id
        });
        // add the new message to database
        const insertedNewMessages = await (0, messages_1.AddNewMessages)(newMessages);
        res.status(200).json(createdDialogue);
    }
    catch (err) {
        console.log("Error creating new dialogue", err);
        res.status(500).json({ error: err });
    }
};
exports.InitiateNewDialogue = InitiateNewDialogue;
const ContinueExistingDialoauge = async (req, res) => {
    try {
        //get the required parameters from the request
        const dialogueId = req.body.dialogueId;
        const newMessage = req.body.content;
        //get message history of this dialogue from db
        const messageHistoryFromDb = await (0, messages_1.GetMessageHistoryByDialogueId)(dialogueId);
        if (!messageHistoryFromDb) {
            res.status(400).json({ error: "No message history available" });
        }
        else {
            //construct a message history object to feed into 
            const messageHistoryToModel = [];
            messageHistoryFromDb.map(msg => {
                messageHistoryToModel.push({ role: msg.speaker_role, parts: [{ text: msg.content }] });
            });
            //feed messages into the model
            const modelResponse = await (0, chatbot_client_1.SendMessageToModel)(messageHistoryToModel, newMessage);
            //insert the messages related to this dialogue to the database
            const newMessages = [];
            newMessages.push({
                speaker_role: "user",
                user_id: 1, //to be modified
                content: newMessage,
                dialogue_id: dialogueId
            });
            newMessages.push({
                speaker_role: "model",
                user_id: 1, //to be modified
                content: modelResponse,
                dialogue_id: dialogueId
            });
            //add new message to db
            const insertedNewMessages = await (0, messages_1.AddNewMessages)(newMessages);
            //get message history of this dialogue from db
            const messageUpdatedHistory = (await (0, messages_1.GetMessageHistoryByDialogueId)(dialogueId)).slice(2);
            res.status(200).json(messageUpdatedHistory);
        }
    }
    catch (err) {
        console.log("Error sending message", err);
        res.status(500).json({ error: err });
    }
};
exports.ContinueExistingDialoauge = ContinueExistingDialoauge;
