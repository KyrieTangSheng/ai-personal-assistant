import React, { useState } from 'react';
import axios from 'axios';
import './AddEventForm.css';

const AddEventForm: React.FC = () => {
    const [eventDetail, setEventDetail] = useState({
        time: "",
        description: "",
        importance: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setEventDetail((prevDetail) => ({
            ...prevDetail,
            [name]: value
        }))
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        axios.post('/api/events', eventDetail)
            .then(response => {
                setEventDetail({time: "", description: "", importance: ""});
                setIsSubmitting(false);
                window.location.reload();
            })
            .catch(error => {
                console.log("There was an error adding this event: ", error.message);
                setIsSubmitting(false);
            });
    };

    return(
       <form onSubmit={handleSubmit} className="formStyle">
        <div className="inputContainerStyle">
            <label className="labelStyle">Time:</label>
            <input
              type="datetime-local"
              name="time"
              value={eventDetail.time}
              onChange={handleChange}
              required
              className="inputStyle"
            />
        </div>
        <div className="inputContainerStyle">
            <label className="labelStyle">Description:</label>
            <input
              name="description"
              value={eventDetail.description}
              onChange={handleChange}
              required
              className="inputStyle"
            />
        </div>
        <div className="inputContainerStyle">
            <label className="labelStyle">Importance:</label>
            <select 
              name="importance"
              value={eventDetail.importance}
              onChange={handleChange}
              required
              className="inputStyle"
            >
              <option value="" disabled>Select Importance</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
        </div>
        <button type="submit" className={isSubmitting ? "buttonSubmittingStyle" : "buttonStyle"}>
          {isSubmitting ? 'Submitting...' : 'Add Event'}
        </button>
       </form>
    );
};

export default AddEventForm;