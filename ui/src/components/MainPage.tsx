import React from 'react';
import { Link } from 'react-router-dom';
import AddEventForm from './Event/AddEventForm';
import EventList from './Event/EventList';

export const MainPage: React.FC = () => {
    return(
        <div>
            <h2>Welcome to AI personal assistant</h2>
            <AddEventForm/>
            <EventList/>
            <Link to='/chat'>
                <button>Go to Chat Page</button>
            </Link>
        </div>
    );
}