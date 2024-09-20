"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewMessages = exports.GetMessageHistoryByDialogueId = void 0;
const supabase_client_1 = require("../services/supabase-client");
const GetMessageHistoryByDialogueId = async (dialogueId) => {
    const { data: messageHistory, error } = await supabase_client_1.supabase
        .from("messages")
        .select("*")
        .eq("dialogue_id", dialogueId)
        .order("id", { ascending: true });
    if (error) {
        throw new Error(error.message);
    }
    return messageHistory || [];
};
exports.GetMessageHistoryByDialogueId = GetMessageHistoryByDialogueId;
const AddNewMessages = async (newMessages) => {
    const { data: createdMessages, error } = await supabase_client_1.supabase
        .from("messages")
        .insert(newMessages)
        .select("*");
    if (error) {
        throw new Error(error.message);
    }
    return createdMessages || [];
};
exports.AddNewMessages = AddNewMessages;
