import React, { Component } from 'react';
import axios from 'axios';

class Calculator extends Component {
    componentDidMount() {
        this.fetchHistory();
    }

    state = {
        firstNumber: '',
        operator: '',
        secondNumber: '',
        history: []
    }

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

    capture = (event) => {
        if (this.state.operator && (Number(event.target.value) >= 0 || event.target.value === ".")) {
            this.setState({
                ...this.state,
                secondNumber: this.state.secondNumber + event.target.value
            })
        } else if (Number(event.target.value) >= 0 || event.target.value === ".") {
            this.setState({
                ...this.state,
                firstNumber: this.state.firstNumber + event.target.value
            })
        } else {
            this.setState({
                ...this.state,
                operator: event.target.value
            })
        }
    }

    submit = () => {
        axios.post('/calculator', { ...this.state })
            .then((response) => {
                console.log(response.statusText)
                this.fetchHistory();
                this.clear();
            }).catch((error) => {
                console.log(error);
            })
    }

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
                        {
                            this.state.history.length > 10 ?
                                this.state.history.slice(this.state.history.length - 10, this.state.history.length).reverse().map((equation, i) => {
                                    return <li key={i}>{equation}</li>
                                })
                                :
                                this.state.history.slice(0, this.state.history.length).reverse().map((equation, i) => {
                                    return <li key={i}>{equation}</li>
                                })
                        }
                    </ul>
                </section>
            </main>
        )
    }
}

export default Calculator;