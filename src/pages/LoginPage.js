import React, { useEffect, useState } from 'react';
import LoginForm from '../Components/Auth/LoginForm';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuthCheck from '../hooks/useAuthCheck';
import authService from '../services/authService';
import { colors } from '@mui/material';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loggedIn, setLoggedIn, username, setUsername } = useAuthCheck(navigate);
    const [remainingTries, setRemainingTries] = useState(3); // Max attempts
    const [timeoutActive, setTimeoutActive] = useState(false);
    const timeoutDuration = 30000; // Timeout duration in milliseconds (30 seconds)

    useEffect(() => {
        if (remainingTries === 0 && !timeoutActive) {
            setTimeout(() => {
                setRemainingTries(3);
                setTimeoutActive(false);
            }, timeoutDuration);
            setTimeoutActive(true);
        }
    }, [remainingTries, timeoutActive]);

    const handleLogin = async (event) => {
        
        if (username !== '' && password !== '' && remainingTries > 0) {
            try {
                await authService.login(username, password)
                    .then(res => {
                        console.log(res.data);
                        setLoggedIn(true);
                        alert('Successful Login In'); // Alert for successful login
                        navigate('/welcome');
                    })
                    .catch(err => {
                        console.error(err);
                        alert(`Login Failed. ${remainingTries} attempts remaining.`); // Alert with remaining tries info
                        setUsername('');
                        setPassword('');
                        setRemainingTries(prevTries => prevTries - 1); // Decrement remaining tries on failed attempt
                    });
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('No more attempts left. Please wait for the timeout.');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: 'url("https://th.bing.com/th/id/OIG1.p_UucIwNBT9lQlpgHSe3?w=1024&h=1024&rs=1&pid=ImgDetMain")', // Background image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            {timeoutActive ? (
                <div style={{ textAlign: 'center' }}>
                    <h3>Timeout Counter</h3>
                    <p>Time remaining before next attempt: {timeoutDuration / 1000} seconds</p>
                </div>
            ) : (
                <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    remainingTries={remainingTries} // Pass remainingTries to the LoginForm component
                />
            )}
        </div>
    );
};

export default LoginPage;
