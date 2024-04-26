import React, { useState } from 'react';
import {
    TextField,
    Button,
    CardContent,
    CardActions,
    Typography,
    IconButton, // Import IconButton for the visibility toggle button
} from '@mui/material';
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import icons for visibility toggle

const SignupForm = ({ signupUsername, signupPassword, setSignupUsername, setSignupPassword, handleSignup }) => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to track password visibility

    const generatePassword = (username) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const minLength = 16;
        const maxLength = 24;
    
        let newPassword = "";
    
        // Take the first 4 characters from the username
        const usernameStart = username.slice(0, 4);
    
        // Add the starting characters from the username to the password
        newPassword += usernameStart;
    
        // Calculate the remaining length for the password
        const remainingLength = Math.max(maxLength - newPassword.length, 0);
        const passwordLength = Math.min(remainingLength, maxLength)
    
        // Add remaining random characters to fill the password
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            newPassword += charset[randomIndex];
        }
    
        return newPassword;
    };
    

    const handleChangePassword = (e) => {
        const password = e.target.value;
        setSignupPassword(password);
        if (password.length < 8 && password !== 'admin') {
            setPasswordError('Minimum 8 characters.');
        } else {
            setPasswordError('');
        }
    };

    const handleChangeConfirmPassword = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        if (confirmPasswordValue !== signupPassword) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleGeneratePassword = () => {
        const generatedPassword = generatePassword(signupUsername);
        setSignupPassword(generatedPassword);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{
            border: '1px solid',
            borderRadius: 5,
            padding: 20,
            boxShadow: '1 2px 8px rgba(0, 0, 0, 0.7)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            maxWidth: 350,
        }}>
            <form onSubmit={handleSignup}>
                <CardContent >
                    <Typography variant="h4" gutterBottom>
                        Signup to Pizza House!
                    </Typography>

                    <TextField
                        required
                        fullWidth
                        label="Username"
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'} // Toggle between text and password type
                        value={signupPassword}
                        onChange={handleChangePassword}
                        margin="normal"
                        error={!!passwordError}
                        helperText={passwordError}
                        InputProps={{ // Add InputProps for the visibility toggle icon button
                            endAdornment: (
                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        required
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                        fullWidth
                        margin="normal"
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
                    />
                    <Button onClick={handleGeneratePassword} variant="outlined">
                        Generate Password
                    </Button>
                </CardContent>
                <CardActions>
                    <Button fullWidth type='submit' variant="contained" disabled={passwordError !== ''}>
                        Signup
                    </Button>
                </CardActions>
            </form>
            <CardActions sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    paddingTop:5,
                }}>
                <Typography varient="body1">Already have an Account?</Typography>
                <Button component={Link} to="/">
                    Login
                </Button>
            </CardActions>
        </div>
    );
};

export default SignupForm;
