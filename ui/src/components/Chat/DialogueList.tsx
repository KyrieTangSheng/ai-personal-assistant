import React from 'react';

interface Dialogue {
    id: number;
    createdAt: string;
}

interface DialogueListProps {
    dialogues: Dialogue[];
    onSelectDialogue: (id: number) => void;
    onNewDialogue: () => void;
    isCreatingDialogue: boolean;
}
export const DialogueList: React.FC<DialogueListProps> = ({dialogues, onSelectDialogue, onNewDialogue, isCreatingDialogue}) => {
    return (
        <div className='Dialogue-List'>
            <button onClick={onNewDialogue} disabled={isCreatingDialogue}>+ New Dialogue</button>
            {dialogues.map(dial => (
                <button key={dial.id} onClick={() => onSelectDialogue(dial.id)}>
                    Dialogue {dial.id} - {dial.createdAt}
                </button>
            ))}
        </div>
    );
}