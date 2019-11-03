const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
const calculator = require('./routes/calculator.router.js');
app.use('/calculator', calculator);

/** ---------- START SERVER ---------- **/
app.listen(PORT, function () {
    console.log('Listening on port: ', PORT);
});