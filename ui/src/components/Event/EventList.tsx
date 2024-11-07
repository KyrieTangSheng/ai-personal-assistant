import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Event from './Event';
import { Card, CardContent, Typography, Grid, CardActions, Button } from '@mui/material';
import './EventList.css';

interface Event {
    id: number;
    time: string;
    description: string;
    importance: string;
    user_id: string;
};



const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        axios.get('/api/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.log("Error when fetching events:", error.message);
            })
    }, []);
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Events
            </Typography>
            <Grid container spacing={3}>
                {events.map(e => (
                    <Grid item xs={12} sm={6} md={4} key={e.id}>
                        <Card className="styled-card">
                            <CardContent>
                                <Typography variant="h6">{e.time}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {e.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Importance: {e.importance}
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button size="small" color="primary">Learn More</Button>
                            </CardActions> */} 
                            {/* TODO: Add button to view detail / edit / delete */}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default EventList;