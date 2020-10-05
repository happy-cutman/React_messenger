import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import SideBar from './components/SideBar/SideBar';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import {useStateValue} from './StateProvider';


function App() {
    const [{user}, dispatch] = useStateValue(); // user из данный при авторизации

    return (
        <div className='app'>

            {!user ? (
                <Login/>
            ) : (
                <div className='app__body'>
                    <SideBar/>
                    <Switch>
                        <Route path="/rooms/:roomId">
                            <Chat/>
                        </Route>
                        <Route path="/">
                            <Chat/>
                        </Route>
                    </Switch>
                </div>
            )}
        </div>
    );
}

export default App;
