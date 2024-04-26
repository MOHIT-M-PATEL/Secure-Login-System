import React, { useState } from 'react';
import SignupForm from '../Components/Auth/SignupForm';
import authService from "../services/authService";


const SignupPage = () => {
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [isSignupClicked, setIsSignupClicked] = useState(false);
    const [redirectTimer, setRedirectTimer] = useState(5); // Timer starts from 5 seconds

    const handleSignup = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (signupUsername !== '' && signupPassword !== '') {
            try {
                await authService.signup(signupUsername, signupPassword)
                    .then(res => {
                        console.log(res.data);
                        setIsSignupClicked(true); // Set signup button clicked to true
                        // Start the timer for redirection
                        const timer = setInterval(() => {
                            setRedirectTimer(prevTimer => prevTimer - 1); // Decrement timer by 1 second
                        }, 1000); // Run every second

                        // Redirect to login page after 5 seconds
                        setTimeout(() => {
                            clearInterval(timer); // Stop the timer
                            window.location.href = '/'; // Redirect to login page
                        }, 5000);
                    })
                    .catch(err => console.error(err));
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: 'url("https://th.bing.com/th/id/OIG1.p_UucIwNBT9lQlpgHSe3?w=1024&h=1024&rs=1&pid=ImgDetMain")', // Background image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',

        }}>
            <SignupForm
                signupUsername={signupUsername}
                signupPassword={signupPassword}
                setSignupUsername={setSignupUsername}
                setSignupPassword={setSignupPassword}
                handleSignup={handleSignup}
            />
            {isSignupClicked && ( // Conditionally render the timer if signup button is clicked
                <div style={{ marginTop: '10px', fontSize: '30px' }}>
                    {/* Display the timer */}
                    {`Redirecting in ${redirectTimer} seconds...`}
                </div>
            )}
        </div>
    );
};

export default SignupPage;
