"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDialoguesByUserId = exports.AddNewDialogue = void 0;
const supabase_client_1 = require("../services/supabase-client");
const AddNewDialogue = async (userId) => {
    const { data: createdDialogue, error } = await supabase_client_1.supabase
        .from("dialogues")
        .insert([{
            user_id: 1, //to be modified
        }])
        .select("*")
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return createdDialogue;
};
exports.AddNewDialogue = AddNewDialogue;
const GetDialoguesByUserId = async (userId) => {
    const { data: dialogues, error } = await supabase_client_1.supabase
        .from("dialogues")
        .select("*");
    if (error) {
        throw new Error(error.message);
    }
    return dialogues;
};
exports.GetDialoguesByUserId = GetDialoguesByUserId;
