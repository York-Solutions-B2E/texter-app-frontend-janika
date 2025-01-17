
import './App.css';
import Messages from './messages/Messages'
import {useEffect, useState} from "react";

function App() {
  const [messages, setMessages] = useState(null);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Fetch data every second
  //     fetch('http://localhost:8080/api/conversations/1')
  //         .then((response) => response.json())
  //         .then((data) => setMessages(data.messages))
  //         .catch((error) => console.error('Error fetching data:', error));
  //   }, 1000); // 1000ms = 1 second
  //
  //   // Cleanup interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    // Fetch data once when the component mounts
    fetch('http://localhost:8080/api/conversations/1')
        .then((response) => response.json())
        .then((data) => setMessages(data.messages))
        .catch((error) => console.error('Error fetching data:', error));
  }, []);

  console.log(messages);

  return (
      <div className="app">
        <div className="messages-container">
            { messages != null ? messages.map((message) => {
                return <Messages key={message.id} message={message} />;
            }) : <div>Send a message!</div>}
        </div>
        <input type="text" />
      </div>
  );
}

export default App;
