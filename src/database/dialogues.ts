import { supabase } from "../services/supabase-client";

export const AddNewDialogue = async(userId: number) => {
    const {data:createdDialogue, error} = await supabase
        .from("dialogues")
        .insert([{
            user_id: 1, //to be modified
        }])
        .select("*")
        .single();
    
    if(error){
        throw new Error(error.message);
    }

    return createdDialogue;
}

export const GetDialoguesByUserId = async(userId: number) => {
    const {data: dialogues, error} = await supabase
        .from("dialogues")
        .select("*");

    if(error){
        throw new Error(error.message);
    }

    return dialogues;
}