const axios = require('axios');

const testBackend = async () => {
    try {
        // 0. Register (in case user doesn't exist)
        console.log('Registering/Updating test user...');
        try {
            await axios.post('http://localhost:5001/api/auth/signup', {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });
            console.log('User registered.');
        } catch (e) {
            console.log('User probably exists, proceeding to login.');
        }

        // 1. Login to get token
        console.log('Logging in...');
        const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
            email: 'test@example.com',
            password: 'password123'
        });

        console.log('Login successful. Token:', loginRes.data.token ? 'Received' : 'Missing');
        const token = loginRes.data.token;

        // 2. Search Movies
        console.log('Searching for Batman...');
        const searchRes = await axios.get('http://localhost:5001/api/movies/search?query=Batman', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Search Response Status:', searchRes.status);
        console.log('Search Data:', JSON.stringify(searchRes.data, null, 2));

    } catch (error) {
        if (error.response) {
            console.error('Error Response:', error.response.status, JSON.stringify(error.response.data));
        } else {
            console.error('Error:', error.message);
        }
    }
};

testBackend();
