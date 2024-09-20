import React, { FC } from 'react';

interface EventProps {
    id: number;
    description: string;
    time: string;
    importance: string;
}

const Event: React.FC<EventProps> = ({id, description, time, importance}) => {

    return(
    <div>
        <h3>{time}</h3>
        <p>{description}</p>
        <p>{importance}</p>
    </div>
    );
}

export default Event;