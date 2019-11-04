import React, { Component } from 'react';
import axios from 'axios';

class Calculator extends Component {
    state = {
        firstNumber: '',
        operator: '',
        secondNumber: '',
        history: [],
    }

    componentDidMount() {
        //shows the history on load, updates at close intervals
        this.fetchHistory();
        this.interval = setInterval(() => {
            this.fetchHistory()
        }, 1000);
    }

    //gets the history array from calculator.router.js
    fetchHistory = () => {
        axios.get('/calculator')
            .then((response) => {
                this.setState({
                    ...this.state,
                    history: response.data
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    //determines if the last button clicked should be stored within firstNumber, secondNumber, or the operator
    capture = (event) => {
        //if operator is already assigned and button clicked can be converted to number or decimal, assign to secondNumber
        if (this.state.operator && (Number(event.target.value) >= 0 || event.target.value === ".")) {
            this.setState({
                ...this.state,
                secondNumber: this.state.secondNumber + event.target.value
            })
        //if operator is not assigned and button clicked can be converted to number or decimal, assign to firstNumber
        } else if (Number(event.target.value) >= 0 || event.target.value === ".") {
            this.setState({
                ...this.state,
                firstNumber: this.state.firstNumber + event.target.value
            })
        //if operator is - and firstNumber is not assigned, assign to firstNumber as negative
        } else if (event.target.value === "-" && !this.state.firstNumber) {
                this.setState({
                    ...this.state,
                    firstNumber: this.state.firstNumber + event.target.value
                })
        //if operator is not assigned and button clicked cannot be converted to number or decimal, assign the operator
        } else if (!this.state.operator) {
            this.setState({
                ...this.state,
                operator: event.target.value
            })
        //if operator is - and secondNumber is not assigned, assign to secondNumber as negative
        } else if (event.target.value === "-" && !this.state.secondNumber) {
            this.setState({
                ...this.state,
                secondNumber: this.state.secondNumber + event.target.value
            })
        //if operator is already assigned and another operator is clicked, update the firstNumber to the value of the previous equation and assign the operator
        } else {
            this.setState({
                ...this.state,
                firstNumber: eval(this.state.firstNumber + this.state.operator + this.state.secondNumber),
                //it is my understanding that eval() is not ideal, but I am using it here for the sake of time. See calculator.server.js for safer (albeit tedious) alternative
                operator: event.target.value,
                secondNumber: ''
            })
        }
    }

    //sends the current equation to calculator.router.js to calculate the solution and store in the history
    submit = () => {
        axios.post('/calculator', { ...this.state })
            .then((response) => {
                this.fetchHistory();
                this.clear();
            }).catch((error) => {
                console.log(error);
            })
    }

    //resets the local state to clear the current equation
    clear = () => {
        this.setState({
            ...this.state,
            firstNumber: '',
            operator: '',
            secondNumber: '',
        })
    }

    render() {
        return (
            <main>
                <h3>Current Equation: <span>{this.state.firstNumber + " " + this.state.operator + " " + this.state.secondNumber}</span></h3>

                <section aria-label="numbers">
                    <button className="calculatorButtons" value={1} onClick={this.capture}>1</button>
                    <button className="calculatorButtons" value={2} onClick={this.capture}>2</button>
                    <button className="calculatorButtons" value={3} onClick={this.capture}>3</button>
                    <button className="calculatorButtons" value={4} onClick={this.capture}>4</button>
                    <button className="calculatorButtons" value={5} onClick={this.capture}>5</button>
                    <button className="calculatorButtons" value={6} onClick={this.capture}>6</button>
                    <button className="calculatorButtons" value={7} onClick={this.capture}>7</button>
                    <button className="calculatorButtons" value={8} onClick={this.capture}>8</button>
                    <button className="calculatorButtons" value={9} onClick={this.capture}>9</button>
                    <button className="calculatorButtons" value={0} onClick={this.capture}>0</button>
                    <button className="calculatorButtons" value="." onClick={this.capture}>.</button>
                </section>

                <section aria-label="operators">
                    <button className="calculatorButtons" value="+" onClick={this.capture}>+</button>
                    <button className="calculatorButtons" value="-" onClick={this.capture}>-</button>
                    <button className="calculatorButtons" value="*" onClick={this.capture}>x</button>
                    <button className="calculatorButtons" value="/" onClick={this.capture}>/</button>
                </section>

                <section aria-label="decisions">
                    <button className="calculatorButtons" label="submit" onClick={this.submit}>=</button>
                    <button className="calculatorButtons" label="cancel" onClick={this.clear}>C</button>
                </section>

                <section aria-label="history">
                    <h3>Recent Equations</h3>
                    <ul className="historyList">
                        {this.state.history && this.state.history.map((equation) => {
                            return <li key={equation.id}>{equation.equation}</li>
                        })}
                    </ul>
                </section>
            </main>
        )
    }
}

export default Calculator;