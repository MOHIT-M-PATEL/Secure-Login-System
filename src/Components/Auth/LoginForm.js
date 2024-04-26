import React, { useState } from 'react';
import {
    TextField,
    Button,
    CardContent,
    CardActions,
    Typography,
    IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA component

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(''); // State to store CAPTCHA value

    const togglePasswordVisibility = () => {
        setShowPassword(prevShow => !prevShow);
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value); // Update CAPTCHA value
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (captchaValue) {
            // Call handleLogin only if captcha is validated
            handleLogin(e);
        } else {
            alert('Please complete the captcha.');
        }
    };


    return (
        <div style={{
            border: '1px solid',
            borderRadius: 5,
            padding: 20,
            boxShadow: '1 2px 8px rgba(0, 0, 0, 0.15)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            maxWidth: 350,
        }}>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Login for Delicious Pizzas!!
                    </Typography>
                    <TextField
                        required
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        required
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                    {/* Add ReCAPTCHA component with valid site key */}
                    <ReCAPTCHA
                        sitekey="6LcJqscpAAAAAL-ZXOyeacd54HcTcFllxRT6QnSr" // Replace 'your_valid_site_key' with your actual Google reCAPTCHA site key
                        onChange={handleCaptchaChange}
                    />
                </CardContent>
                <CardActions sx={{
                    paddingTop: 1,
                }}>
                    <Button fullWidth type='submit' variant="contained">
                        Login
                    </Button>
                </CardActions>
            </form>
            <CardActions sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 5,
            }}>
                <Typography variant="body1">Don't have an Account?</Typography>
                <Button component={Link} to="/signup">
                    Signup
                </Button>
            </CardActions>
        </div>
    );
};

export default LoginForm;
