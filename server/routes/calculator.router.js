const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//receives the equation from Calculator.js and calculates the result, storing it in the database
router.post('/', (req, res) => {
    let equation = req.body.firstNumber + " " + req.body.operator + " " + req.body.secondNumber;
    let solution = eval(Number(req.body.firstNumber) + (req.body.operator) + Number(req.body.secondNumber));
    let queryText = `INSERT INTO "history" ("equation") VALUES ($1);`
    pool.query(queryText, [equation + " = " + solution])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })
})

//provides the equation history back to Calculator.js
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "history" ORDER BY "id" DESC LIMIT 10;`
    pool.query(queryText)
    .then((result)=>{
        res.send(result.rows)
    }).catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })
})

module.exports = router;