import { supabase } from "../services/supabase-client";

export interface Event{
    description: string;
    importance: string;
    time: string;
}

export const GetPendingEventsByUserId = async(userId: number): Promise<Event[]> => {
    const {data: pendingEvents, error} = await supabase
        .from("events")
        .select("*")
        .eq("user_id", 1) //to be modified
        .eq("status", "pending")
        .gte("time",new Date().toISOString());
    
    if(error){
        throw new Error(error.message);
    }

    return pendingEvents || [];
}

export const GetAllEventsByUserId = async(userId: number): Promise<Event[]> => {
    const {data: events, error} = await supabase
        .from("events")
        .select("*")
        .eq("user_id", 1); //to be modified
    
    if(error){
        throw new Error(error.message);
    }

    return events || [];
}

export const AddNewEvent = async(newEvent: Event): Promise<Event> => {
    const {data: createdEvent, error} = await supabase
        .from("events")
        .insert([newEvent])
        .select("*")
        .single();

    if(error){
        throw new Error(error.message);
    }

    return createdEvent
}