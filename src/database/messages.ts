import { supabase } from "../services/supabase-client";

export interface DbMessage {
    id: number;
    dialogue_id: number;
    speaker_role: string;
    content: string;
}

export interface Message{
    speaker_role: string;
    user_id: number;
    content: string;
    dialogue_id: number;
}

//define interfaces
export interface Part {
    text: string
}
export interface ModelMessage {
    role: string;
    parts: Part[];
}

export const GetMessageHistoryByDialogueId = async(dialogueId:number): Promise<DbMessage[]> => {
    const {data: messageHistory, error} = await supabase
        .from("messages")
        .select("*")
        .eq("dialogue_id", dialogueId)
        .order("id", {ascending: true});

    if(error){
        throw new Error(error.message);
    }

    return messageHistory || [];
}

export const AddNewMessages = async(newMessages: Message[]): Promise<DbMessage[]> => {
    const {data:createdMessages, error} = await supabase
        .from("messages")
        .insert(newMessages)
        .select("*");
    if(error){
        throw new Error(error.message);
    }
    return createdMessages || [];
}

