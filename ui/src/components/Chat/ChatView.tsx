import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ChatMessage } from './ChatMessage';

interface ChatViewProps {
    dialogueId: number;
}

interface Message {
    speaker_role: string;
    content: string;
    id: number;
}
export const ChatView: React.FC<ChatViewProps> = ({dialogueId}) => {
    const [messageHistory, setMessageHistory] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isSendingMessage, setIsSendingMessage] = useState(false);

    useEffect(() => {
        fetchChatHistory(dialogueId);
    }, [dialogueId]);

    const fetchChatHistory = async(dialogueId: number) => {
        if(!dialogueId){
            return; //haven't selected any dialogue yet
        }
        axios.get(`/api/dialogues/${dialogueId}`)
            .then(response => {
                if(Array.isArray(response.data)){
                    setMessageHistory(response.data);
                } 
            })
            .catch(error => {
                console.log("Error fetching message history:", error.message);
            });
    };

    const handleSendMessage = async(event: React.FormEvent) => {
        event.preventDefault();
        if(isSendingMessage){
            return;
        } else {
            setIsSendingMessage(true);
        }

        axios.post('/api/messages/existing', {content: input, dialogueId: dialogueId})
            .then(response => {
                if(Array.isArray(response.data)){
                    setMessageHistory(response.data);
                    setInput("");
                    setIsSendingMessage(false);
                }
            })
            .catch(error => {
                console.log("Error sending message:", error.message);
                setIsSendingMessage(false);
            });
    };

    return (
        <div>
            {messageHistory.map(msg => (<ChatMessage key={msg.id} sender = {msg.speaker_role} message={msg.content} />))}
            <form onSubmit={handleSendMessage}>
                <input
                    type = "text"
                    value = {input}
                    onChange = {e => setInput(e.target.value)}
                    placeholder= "Type your message here.."
                />
                <button type= "submit" disabled={isSendingMessage}>Send</button>
            </form>
        </div>
    )
}