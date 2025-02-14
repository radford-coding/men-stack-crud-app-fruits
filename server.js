const express = require('express');
const app = express();

// GET

app.get('/', async (req, res) => {
    res.render('index.ejs');
});




const listener = app.listen(3000, () => console.log(`listening on part ${listener.address().port}`));