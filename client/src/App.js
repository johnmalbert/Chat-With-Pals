import './App.css';
import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import io from 'socket.io-client';


function App() {
  const [socket] = useState(() => io(':8000'));
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [typingStatus, setTypingStatus] = useState("")

  socket.on('messageSent', data => {
    setTypingStatus("");
    setMessages([...messages, data]);
  });
  socket.on('clientTyping', data => {
    setTypingStatus(data);
    setTimeout(() => setTypingStatus(""), 10000);
  });
  const typingHandler = e => {
    setMessage(e.target.value);
    socket.emit('clientTyping', `${user} is typing...`);
  }
  const submitHandler = e => {
    e.preventDefault();

    socket.emit('sendMessage', { user, message });
    setMessages([...messages, {user, message}]);
    setMessage('');
  }
  useEffect(() => {

    return () => socket.disconnect(true);
  }, [])
  return (
    <div className="App">
      <h1>Hello there!</h1>
      <div>
        <h3>Message Board</h3>
        {
          messages.map((item, i) => 
            <p>{item.user}: {item.message}</p>
          )
        }
        <span>{typingStatus}</span>
      </div>
      <form onSubmit = {submitHandler}>
        <input type="text" className="text" name="user" onChange={e => setUser(e.target.value) } placeholder="username"/>
        <input type="text" className="text" name="message" onChange={ typingHandler } value={message}/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
