import { Card } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import React, {useState} from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';


const MessageBoard = props => {
    const { typingStatus, messages } = props;
    
    return (
        <div>
            <Paper elevation={3} style={{width: "75%", margin: "auto"}}>
                {
                    messages.map((item, i) => 
                    <Card>
                        <p><AccountCircle style={{verticalAlign: "bottom"}} />{item.user}: {item.message}</p>
                    </Card>
                    )
                }
                <span>{typingStatus}</span>
            </Paper>
        </div>
    )
}

export default MessageBoard
