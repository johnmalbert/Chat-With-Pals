import './App.css';
import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import io from 'socket.io-client';
import MessageBoard from './components/MessageBoard';


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

  const userChangeHandler = e => {
    setUser(e.target.value);
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
      <h1>Chat with Pals!</h1>
      <ChatWindow typingHandler = {typingHandler} submitHandler= {submitHandler} message = {message} setMessage = {setMessage} />
      <MessageBoard typingStatus = {typingStatus} messages = {messages} />
    </div>
  );
}

export default App;
