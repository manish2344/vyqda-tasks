import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [phone, setPhone] = useState('');
    const [responseHeaders, setResponseHeaders] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const submitPhoneNumber = async () => {
        if (!phone) {
            setErrorMessage('Phone number is required.');
            return;
        }

        setErrorMessage('');

        try {
            const res = await fetch('https://chimpu.online/api/post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone }),
            });

            if (!res.ok) {
                throw new Error('Failed to send data');
            }

            const headers = [...res.headers].reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

            setResponseHeaders(headers);
        } catch (error) {
            console.error('Request error:', error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="app-container">
            <h1 className="header">Phone Number Submission</h1>
            <div className="form-container">
                <label htmlFor="phone" className="label">Phone Number:</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="input"
                />
                <button onClick={submitPhoneNumber} className="submit-button">Submit</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

            {responseHeaders && (
                <div className="response-container">
                    <h3>Response Headers:</h3>
                    <pre>{JSON.stringify(responseHeaders, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
