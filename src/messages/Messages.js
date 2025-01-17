import React, {useEffect, useState} from 'react';
import './styles.css';
import editIcon from '../assets/edit.svg'
import deleteIcon from '../assets/delete.svg'
import saveIcon from '../assets/save.svg'
import cancelIcon from '../assets/cancel.svg'

function Messages({ key, message, currentUser, setMessages }) {
    const [messageText, setMessageText] = useState(message.text); // State to store message text
    const [isEditing, setIsEditing] = useState(false); // State to track if the message is being edited

    // Function to handle the update
    const updateMessage = () => {
        setIsEditing(true); // Enable editing
    };

    // Function to handle save after editing
    const saveMessage = () => {
        setIsEditing(false); // Disable editing
        // Here, you can add any logic to save the updated message to the backend or wherever needed

        fetch(`http://localhost:8080/api/messages/${message.id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: message.id,
                text: messageText,
                timestamp: new Date().toISOString().slice(0, 23),
                status: "SENT",
                user: currentUser
            }), // send input value as payload
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                // Handle the response data
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const deleteMessage = () => {
        fetch(`http://localhost:8080/api/messages/${message.id}/delete`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                // Handle the response data
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    const convertTimeStamp = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }
    return (
        <div className="message" key={key}>
            <div>
                <p>
                    <span className="username">{message.user.username}</span>
                    <span className="timestamp">({convertTimeStamp(message.timestamp)})</span>:
                    {message.status === "DELETE" ? (
                        <span className="blurred">Message Deleted</span> // Apply blur effect
                    ) : isEditing ? (
                        <input
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)} // Update message text as user types
                        />
                    ) : (
                        <span className="message-text">{message.text}</span> // Display message text normally
                    )}
                </p>
                {currentUser.id == message.user.id ?
                    <div>
                        <button onClick={isEditing ? saveMessage : updateMessage}>
                            {isEditing ? <><img src={saveIcon} alt="save icon" /> <button><img src={cancelIcon}/></button></> :
                                <img src={editIcon} alt="edit icon" />
                            }
                        </button>
                        <button onClick={deleteMessage}><img src={deleteIcon} alt="delete" /></button> </div>: null}
            </div>

            <span className="message-status">{message.status === "DELETE" ? "Deleted" : message.status.charAt(0).toUpperCase() + message.status.slice(1).toLowerCase()}</span>
        </div>
    );
}

export default Messages;
