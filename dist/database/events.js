"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewEvent = exports.GetAllEventsByUserId = exports.GetPendingEventsByUserId = void 0;
const supabase_client_1 = require("../services/supabase-client");
const GetPendingEventsByUserId = async (userId) => {
    const { data: pendingEvents, error } = await supabase_client_1.supabase
        .from("events")
        .select("*")
        .eq("user_id", 1) //to be modified
        .eq("status", "pending")
        .gte("time", new Date().toISOString());
    if (error) {
        throw new Error(error.message);
    }
    return pendingEvents || [];
};
exports.GetPendingEventsByUserId = GetPendingEventsByUserId;
const GetAllEventsByUserId = async (userId) => {
    const { data: events, error } = await supabase_client_1.supabase
        .from("events")
        .select("*")
        .eq("user_id", 1); //to be modified
    if (error) {
        throw new Error(error.message);
    }
    return events || [];
};
exports.GetAllEventsByUserId = GetAllEventsByUserId;
const AddNewEvent = async (newEvent) => {
    const { data: createdEvent, error } = await supabase_client_1.supabase
        .from("events")
        .insert([newEvent])
        .select("*")
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return createdEvent;
};
exports.AddNewEvent = AddNewEvent;
