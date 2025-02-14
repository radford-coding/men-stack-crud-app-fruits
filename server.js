const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`connected to mongodb ${mongoose.connection.name}.`);
});

// GET

app.get('/', async (req, res) => {
    res.render('index.ejs');
});




const listener = app.listen(3000, () => console.log(`listening on part ${listener.address().port}`));