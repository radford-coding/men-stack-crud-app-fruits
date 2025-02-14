const express = require('express');
const app = express();






const listener = app.listen(3000, () => console.log(`listening on part ${listener.address().port}`));