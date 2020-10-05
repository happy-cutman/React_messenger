import React, {useEffect, useState} from 'react';
import {Avatar} from '@material-ui/core';
import db from './../../firebase'

import './SideBarChat.css';
import {Link} from 'react-router-dom';

//<Avatar src='https://avatars.dicebear.com/api/human/${seed}.svg'/> добавляет рандомный аватар

const SideBarChat = ({addNewChat, id, name}) => {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    // генерирует рандомное число от 0 до 5000
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    // достаёт последнее сообщение из бд
    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id)
                .collection('messages').orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc => doc.data()))
                })
        }
    }, []);

    const createChat = () => {
        const roomName = prompt(
            'Please, enter name for dialog'
        );

        if (roomName) {
            // some database stuff
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };


    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}/>
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div className='sidebarNew__container'>
            <div onClick={createChat} className='sidebarNew'>
                <h3>Add new Chat</h3>
            </div>
        </div>
    );
};

export default SideBarChat;