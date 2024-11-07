import React from 'react';
import { Link } from 'react-router-dom';
import AddEventForm from './Event/AddEventForm';
import EventList from './Event/EventList';
import './MainPage.css';
export const MainPage: React.FC = () => {
    return(
        <div className="container">
            <header className="header">
                <h1>Event Management</h1>
            </header>
            <div className="flex-container">
                <div className="card">
                    <AddEventForm/>
                </div>
                <div className="card">
                    <EventList/>
                </div>
            </div>
            <div className="button-container">
                <Link to='/chat'>
                    <button className="button">
                        Go to Chat Page
                    </button>
                </Link>
            </div>
        </div>
    );
}