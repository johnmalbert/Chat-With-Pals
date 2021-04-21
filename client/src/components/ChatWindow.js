import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


const ChatWindow = () => {
    const [socket] = useState(() => io(':8000'));
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");

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
    return (
        <div>
        <Paper color="primary" style= {{marginBottom: "10px", padding: "10px"}}>
            <FormControl>
                <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
                <Input
                id="input-with-icon-adornment"
                type="text" name="user" onChange={e => setUser(e.target.value) }
                startAdornment={
                    <InputAdornment position="start">
                    <AccountCircle />
                    </InputAdornment>
                }
                />
            </FormControl>
            <br/>
            <br/>
            <form onSubmit = {submitHandler}>
                <TextField id="outlined-basic" variant="outlined" name="message" onChange={ typingHandler } value={message} placeholder="Message" multiline rows={4} />
                <br/>
                <br/>
                <Button variant="contained" type="submit" color="primary">Send Message</Button>
                <br/>
            </form>
        </Paper>
        </div>
    )
}

export default ChatWindow
