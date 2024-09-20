import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { DialogueList } from './DialogueList';
import { ChatView } from './ChatView';
import { create } from 'domain';

interface Dialogue{
    id: number;
    createdAt: string;
}
export const ChatPage: React.FC = () => {
    const navigator = useNavigate();

    const [dialogueList, setDialogueList] = useState<Dialogue[]>([]);
    const [isCreatingDialogue, setIsCreatingDialogue] = useState<boolean>(false);
    
    useEffect(() => {
        fetchDialogueList();
    }, []);

    const fetchDialogueList = async() => {
        axios.get('/api/dialogues')
            .then(response => {
                setDialogueList(response.data);
            })
            .catch(error => {
                console.log("Error fetching dialogue list:", error.message);
            });
    }

    const handleNewDialogue = async() => {
        if(isCreatingDialogue){
            return;
        } else {
            setIsCreatingDialogue(true);
        }

        axios.post('/api/messages/new', {userId:1}) // to be modified about this userId=1
            .then(response => {
                const createdDialogue = response.data;
                setDialogueList([...dialogueList, createdDialogue])
                setIsCreatingDialogue(false);
                handleSelectDialogue(createdDialogue.id);
            })
            .catch(error => {
                console.log("Error creating new dialogue: ", error);
                setIsCreatingDialogue(false);
            });
    }

    const handleSelectDialogue = (id: number) => {
        navigator(`/chat/${id}`);
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<DialogueList 
                    dialogues={dialogueList} 
                    onSelectDialogue={handleSelectDialogue} 
                    onNewDialogue={handleNewDialogue}
                    isCreatingDialogue={isCreatingDialogue}/>} />
                <Route path="/:dialogueId" element= {<ChatViewWrapper/>}/>
            </Routes>
        </div>
    )
}

const ChatViewWrapper:React.FC = () => {
    const {dialogueId} = useParams<{dialogueId: string}>();
    return(
        <ChatView dialogueId={parseInt(dialogueId || "0")}/>
    );
}