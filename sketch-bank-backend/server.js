const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin : ['http://localhost:5173']
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.get('/', cors(corsOptions), async (req, res) => {
    try {
        console.log('Connected Successfully!');
        res.sendFile('test.html', {root: __dirname})
    } catch (error) {
        console.error('Error');
    }
})
app.use('/users', userRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})