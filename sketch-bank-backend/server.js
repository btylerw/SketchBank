const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        console.log('Connected Successfully!');
        res.sendFile('test.html', {root: __dirname})
    } catch (error) {
        console.error('Error');
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})