import React from 'react';

interface ChatMessageProps {
    sender: string;
    message: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({sender, message}) => {
    return (
        <div className={'Chat-Message-${sender}'}>
            <p>{sender}: {message}</p>
        </div>
    );
}