const express = require('express');
const router = express.Router();
// const pool = require('../modules/pool.js');

let history = [];

//receives the equation and calculates the result
router.post('/', (req, res) => {
    let equation = req.body.firstNumber + " " + req.body.operator + " " + req.body.secondNumber;
    let solution = eval(Number(req.body.firstNumber) + (req.body.operator) + Number(req.body.secondNumber));
    history.push(equation + " = " + solution);
    res.sendStatus(200);
})

//provides the equation history back to the client
router.get('/', (req, res) => {
    res.send(history);
})

module.exports = router;