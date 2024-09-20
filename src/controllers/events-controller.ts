import { request } from "http";
import { supabase } from "../services/supabase-client";
import { Request, Response } from "express";
import { AddNewEvent, GetAllEventsByUserId } from "../database/events";

export const addEvents = async(req: Request, res: Response) => {
    try{
        const event = req.body;

        event.user_id = 1; //to be modified
        event.status = "pending";

        const createdEvent = await AddNewEvent(event);
        
        res.status(200).json(createdEvent);
    } catch(err) {
        console.error("Error adding event:", err);
        res.status(500).json({"error": err});
    }
}

export const getEvents = async(req: Request, res: Response) => {
    try {
        const user_id = 1; // to be modified

        const events = await GetAllEventsByUserId(user_id);
        
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ "error": err });
    }
}
