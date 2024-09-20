import React, { useState } from 'react';
import axios from 'axios';

const AddEventForm: React.FC = () => {
    const [eventDetail, setEventDetail] = useState({
        time: "",
        description: "",
        importance: ""
    });
   
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setEventDetail((prevDetail) => ({
            ...prevDetail,
            [name]: value
        }))
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.post('/api/events', eventDetail)
            .then(response => {
                setEventDetail({time: "", description: "", importance: ""});
            })
            .catch(error => {
                console.log("There was an error adding this event: ", error.message);
            });
        };

    return(
       <form onSubmit={handleSubmit}>
        <div>
            <label>Time:</label>
            <input
              type="datetime-local"
              name="time"
              value={eventDetail.time}
              onChange={handleChange}
              required
            />
        </div>
        <div>
            <label>Description:</label>
            <input
              name="description"
              value={eventDetail.description}
              onChange={handleChange}
              required
            />
        </div>
        <div>
            <label>Importance:</label>
            <select 
              name="importance"
              value={eventDetail.importance}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Importance</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
        </div>
        <button type="submit">Add Event</button>
       </form>
    );
};

export default AddEventForm;