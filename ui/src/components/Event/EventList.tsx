import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Event from './Event';

interface Event{
    id: number;
    time: string;
    description: string;
    importance: string;
    user_id: string;
};

const EventList: React.FC = () => {
    const [events,setEvents] = useState<Event[]>([]);
    useEffect(() => {
        axios.get('/api/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.log("Error when fetching events:", error.message);
            })
    }, []);
    return(
        <div>
            <h2>Events</h2>
            {events.map(e => (<Event key={(e.id)} {...e}/>))}
        </div>
    );
};

export default EventList;