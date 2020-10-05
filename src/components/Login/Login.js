import React from 'react';
import './Login.css'
import {Button} from '@material-ui/core';
import {auth, provider} from '../../firebase';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer';


const Login = () => {
    const [{}, dispatch] = useStateValue(); // {} - state, dispatch - function

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch(error => alert(error.message))
    };

    return (
        <div className='login'>
            <div className='login__container'>
                <img src='https://cdn.worldvectorlogo.com/logos/react-native-firebase-1.svg' alt=''/>
                <div className='login__text'>
                    <h1>Welcome to React Chat</h1>
                </div>

                <Button onClick={signIn}>
                    Sign in With Google
                </Button>
            </div>
        </div>
    );
};

export default Login;