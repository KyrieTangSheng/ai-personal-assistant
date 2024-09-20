"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMessageHistory = exports.GetDialogueList = void 0;
const dialogues_1 = require("../database/dialogues");
const messages_1 = require("../database/messages");
const GetDialogueList = async (req, res) => {
    try {
        const dialogueList = await (0, dialogues_1.GetDialoguesByUserId)(1); // to be modified this userId = 1
        res.status(200).json(dialogueList);
    }
    catch (err) {
        console.log("Error fecthing dialogue list:", err);
        res.status(500).json({ error: err });
    }
};
exports.GetDialogueList = GetDialogueList;
const GetMessageHistory = async (req, res) => {
    try {
        const dialogueId = req.params.dialogueId;
        const messageHistory = await (0, messages_1.GetMessageHistoryByDialogueId)(parseInt(dialogueId));
        //remove the first two records: (1) prompt and (2) model initial response 
        const slicedMessageHistory = messageHistory.slice(2);
        res.status(200).json(slicedMessageHistory);
    }
    catch (err) {
        console.log("Error fechting message history:", err);
        res.status(500).json({ error: err });
    }
};
exports.GetMessageHistory = GetMessageHistory;
