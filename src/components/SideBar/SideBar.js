import React, {useState, useEffect} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import './SideBar.css'
import SideBarChat from '../SideBarChat/SideBarChat';
import db from '../../firebase';
import {useStateValue} from '../../StateProvider';

// IconButton добавляет интерактив к иконкам

const SideBar = () => {
    const [{user}, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        });

        return () => {
            unsubscribe()
        }
    }, []);

    console.log(user)

    return (
        <div className='sidebar'>

            <div className='sidebar__header'>
                <Avatar referrerPolicy='no-referrer' src={user?.photoURL}/>
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLargeIcon style={{color: '#6d869a'}}/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon style={{color: '#6d869a'}}/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style={{color: '#6d869a'}}/>
                    </IconButton>
                </div>
            </div>

            <SideBarChat addNewChat/>
        
            <div className='sidebar__chats'>
                {rooms.map(room => <SideBarChat key={room.id}
                                                id={room.id}
                                                name={room.data.name}
                                                />)}
            </div>
        </div>
    );
};

export default SideBar;