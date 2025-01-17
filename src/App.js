
import './App.css';
import Messages from './messages/Messages'
import {useEffect, useState} from "react";

function App() {
  const [messages, setMessages] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [currentUser, setCurrentUser] = useState({"id": 2, "username": "janika"})
    // Handle the input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch data every second
      fetch('http://localhost:8080/api/conversations/1')
          .then((response) => response.json())
          .then((data) => setMessages(data.messages))
          .catch((error) => console.error('Error fetching data:', error));
    }, 2000); // 1000ms = 1 second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  console.log(messages);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send a POST request
        fetch('http://localhost:8080/api/messages/conversations/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "text": inputValue,
                "status": "SENT",
                "user": currentUser,
                "timestamp": new Date().getTime(),
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

        setInputValue('');
    };



  return (
      <div className="app">
          <div className="messages-container">
              {messages != null ? messages
                  .sort((a, b) => a.id - b.id)
                  .map((message) => {
                  return <Messages key={message.id} message={message} currentUser={currentUser} setMessages={setMessages} />;
              }) : <div>Send a message!</div>}
          </div>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter something"
              />
              <button type="submit">Submit</button>
          </form>
      </div>
  );
}

export default App;
