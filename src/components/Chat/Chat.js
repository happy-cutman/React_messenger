import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import firebase from 'firebase';

import './Chat.css';
import db from './../../firebase'
import {useStateValue} from '../../StateProvider';


const Chat = () => {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name)
            });

            db.collection('rooms').doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
        }
    }, [roomId]);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId]);


    const sendMessage = (event) => {
        event.preventDefault();

        db.collection('rooms').doc(roomId)
            .collection('messages')
            .add({
                message: input,
                name: user.displayName,  //come form google auth
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

        setInput('')
    };


    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}/>
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>
                        last seen {messages.length!==0?(messages[messages.length-1].timestamp?.toDate().toUTCString()):"Loading"}
                    </p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined style={{color: '#6d869a'}}/>
                    </IconButton>
                    <IconButton>
                        <AttachFile style={{color: '#6d869a'}}/>
                    </IconButton>
                    <IconButton>
                        <MoreVert style={{color: '#6d869a'}}/>
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {String(new Date(message.timestamp?.toDate()).toUTCString()).slice(5,12)
                            + String(new Date(message.timestamp?.toDate()).toUTCString()).slice(17,22)}
                        </span>
                    </p>
                ))}
            </div>

            <div className='chat__footer'>
                <IconButton>
                    <InsertEmoticonIcon style={{color: '#6d869a'}}/>
                </IconButton>

                <form>
                    <input value={input}
                           onChange={event => setInput(event.target.value)}
                           placeholder='Type a message...' type='text'/>
                    <button onClick={sendMessage} type='submit'>Send</button>
                </form>

                <IconButton>
                    <MicIcon style={{color: '#6d869a'}}/>
                </IconButton>
            </div>
        </div>
    );
};

export default Chat;