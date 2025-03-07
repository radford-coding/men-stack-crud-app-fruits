const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");

// won't actually create the database until there's data added into it
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`connected to mongodb ${mongoose.connection.name}.`);
});

const Fruit = require('./models/fruit');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

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

// GET /fruits/:id
app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
});

// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
});

// GET localhost:3000/fruits/:fruitId/edit
app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
        fruit: foundFruit,
    });
});

// PUT
app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    console.log('here');
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
});



// DELETE
app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
});





const listener = app.listen(3000, () => console.log(`listening on part ${listener.address().port}`));