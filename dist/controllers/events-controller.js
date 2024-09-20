"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.addEvents = void 0;
const events_1 = require("../database/events");
const addEvents = async (req, res) => {
    try {
        const event = req.body;
        event.user_id = 1; //to be modified
        event.status = "pending";
        const createdEvent = await (0, events_1.AddNewEvent)(event);
        res.status(200).json(createdEvent);
    }
    catch (err) {
        console.error("Error adding event:", err);
        res.status(500).json({ "error": err });
    }
};
exports.addEvents = addEvents;
const getEvents = async (req, res) => {
    try {
        const user_id = 1; // to be modified
        const events = await (0, events_1.GetAllEventsByUserId)(user_id);
        res.status(200).json(events);
    }
    catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ "error": err });
    }
};
exports.getEvents = getEvents;
