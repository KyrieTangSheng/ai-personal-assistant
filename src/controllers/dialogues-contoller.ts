import { Request, Response } from "express";
import { GetDialoguesByUserId } from "../database/dialogues";
import { GetMessageHistoryByDialogueId } from "../database/messages";

export const GetDialogueList = async(req: Request, res:Response) => {
    try{
        const dialogueList = await GetDialoguesByUserId(1); // to be modified this userId = 1
        res.status(200).json(dialogueList);
    } catch (err) {
        console.log("Error fecthing dialogue list:", err)
        res.status(500).json({error: err});
    }
}

export const GetMessageHistory = async(req: Request, res:Response) => {
    try{
        const dialogueId = req.params.dialogueId;
        const messageHistory = await GetMessageHistoryByDialogueId(parseInt(dialogueId));

        //remove the first two records: (1) prompt and (2) model initial response 
        const slicedMessageHistory = messageHistory.slice(2);
        
        res.status(200).json(slicedMessageHistory);
    } catch (err) {
        console.log("Error fechting message history:", err);
        res.status(500).json({error: err});
    }
}