import { supabase } from "../services/supabase-client";

export interface UserDetail{
    username: string;
}

export const GetUserDetailByUserId = async(userId: number): Promise<UserDetail> => {
    const {data: userDetail, error} = await supabase
    .from("users")
    .select("*")
    .eq("id", userId) // to be modified
    .single(); 

    if(error){
        throw new Error(error.message);
    }

    return userDetail || {username:"Default User"};
}