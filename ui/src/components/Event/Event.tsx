import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import './Event.css';

interface EventProps {
    id: number;
    description: string;
    time: string;
    importance: string;
}

const Event: React.FC<EventProps> = ({ id, description, time, importance }) => {
    return (
        <Card className="event-card">
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {time}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    {description}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                    Importance: {importance}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default Event;