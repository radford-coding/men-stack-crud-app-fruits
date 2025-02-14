const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// won't actually create the database until there's data added into it
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`connected to mongodb ${mongoose.connection.name}.`);
});

const Fruit = require('./models/fruit');

app.use(express.urlencoded({ extended: false }));

/*  */

// GET /
app.get('/', async (req, res) => { // async for database connections
    res.render('index.ejs');
});

// GET /fruits
app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
});

// GET /fruits/new
app.get('/fruits/new', (req, res) => {
    res.render('./fruits/new.ejs');
});

// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/new");
});





const listener = app.listen(3000, () => console.log(`listening on part ${listener.address().port}`));