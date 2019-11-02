import React, {Component} from 'react';

class Calculator extends Component {
    state = {
        firstNumber: '',
        operator: '',
        secondNumber: '',
        history: []
    }

    capture = (event) => {
            if (this.state.operator && (Number(event.target.value) >= 0 || event.target.value === ".")){
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

    submit = ()=>{
        let equation = this.state.firstNumber + " " + this.state.operator + " " + this.state.secondNumber;
        let solution = eval(Number(this.state.firstNumber)+(this.state.operator)+Number(this.state.secondNumber));
        console.log(solution)
        this.setState({
            ...this.state,
            history: [...this.state.history, equation+" = "+solution],
            firstNumber: '',
            operator: '',
            secondNumber: ''
        })
    }

    clear = ()=>{
        this.setState({
            ...this.state,
            firstNumber: '',
            operator: '',
            secondNumber: '',
        })
    }

    render (){
        console.log(this.state)

        return (
            <>
                <h2>Calculator</h2>
                <h6>Note: This is a simple calculator and can only handle one operation on two numbers per submission.</h6>
                <br />
                {/* numbers (tried to use a loop to create this, no luck) */}
                <button value={1} onClick={this.capture}>1</button>
                <button value={2} onClick={this.capture}>2</button>
                <button value={3} onClick={this.capture}>3</button>
                <button value={4} onClick={this.capture}>4</button>
                <button value={5} onClick={this.capture}>5</button>
                <button value={6} onClick={this.capture}>6</button>
                <button value={7} onClick={this.capture}>7</button>
                <button value={8} onClick={this.capture}>8</button>
                <button value={9} onClick={this.capture}>9</button>
                <button value={0} onClick={this.capture}>0</button>
                {/* symbols */}
                <button value="." onClick={this.capture}>.</button>
                {/* <button value="%" onClick={this.capture}>%</button>  */} {/* modulo only - does not work as percentage */}
                {/* <button value=".Abs" onClick={this.capture}>+/-</button> */} {/* absolute value */}
                {/* <button value="**" onClick={this.capture}>^</button> */} {/* exponentation */}
                <br />
                {/* operators */}
                <button value="+" onClick={this.capture}>+</button>
                <button value="-" onClick={this.capture}>-</button>
                <button value="*" onClick={this.capture}>x</button>
                <button value="/" onClick={this.capture}>/</button>
                <br />
                {/* Submit */}
                <button onClick={this.submit}>=</button>
                <button onClick={this.clear}>C</button>
                <br />
                <h4>Current Equation: <span>{this.state.firstNumber + " " + this.state.operator + " " + this.state.secondNumber}</span></h4>
                <h4>Recent Equations</h4>
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
            </>
        )
    }
}

export default Calculator;


// import React, { Component } from 'react';

// class Calculator extends Component {
//     state = {
//         input: []
//     }

//     capture = (event) => {
//         let clicked = () => {
//             if (Number(event.target.value)) {
//                 return Number(event.target.value)
//             } else {
//                 return event.target.value
//             }
//         }
//         let dataType = typeof clicked();
//         console.log(dataType)
//         this.setState({
//             ...this.state,
//             input: [...this.state.input, clicked()]
//         })
//     }

//     submit = () => {
//         let equation = this.state.input;
//         let previousNumber;
//         let operator;
//         let currentNumber;
//         for (let character of equation) {
//             if (typeof character == 'string' && operator) {
//                 previousNumber = eval([previousNumber, operator, currentNumber].join(""))
//             }
//             else if (typeof character == 'string') {
//                 operator = character
//             } else if (operator) {
//                 currentNumber += character //this will add, not concat...
//             } else {
//                 previousNumber += character
//             }
//         }
//         console.log(previousNumber)
//     }

//     clear = () => {
//         this.setState({
//             ...this.state,
//             input: []
//         })
//     }

//     render() {
//         console.log(this.state.input);
//         //TODO: eval() should be replaced - find a better method
//         console.log(this.state.input.join(""));
//         return (
//             <div>
//                 <h2>Calculator</h2>
//                 <br />
//                 {/* numbers (tried to use a loop to create this, no luck) */}
//                 <button value={1} onClick={this.capture}>1</button>
//                 <button value={2} onClick={this.capture}>2</button>
//                 <button value={3} onClick={this.capture}>3</button>
//                 <button value={4} onClick={this.capture}>4</button>
//                 <button value={5} onClick={this.capture}>5</button>
//                 <button value={6} onClick={this.capture}>6</button>
//                 <button value={7} onClick={this.capture}>7</button>
//                 <button value={8} onClick={this.capture}>8</button>
//                 <button value={9} onClick={this.capture}>9</button>
//                 <button value={0} onClick={this.capture}>0</button>
//                 {/* symbols */}
//                 <button value="." onClick={this.capture}>.</button>
//                 {/* <button value="%" onClick={this.capture}>%</button>  */} {/* modulo only - does not work as percentage */}
//                 {/* <button value=".Abs" onClick={this.capture}>+/-</button> */} {/* absolute value */}
//                 {/* <button value="**" onClick={this.capture}>^</button> */} {/* exponentation */}
//                 <br />
//                 {/* operators */}
//                 <button value="+" onClick={this.capture}>+</button>
//                 <button value="-" onClick={this.capture}>-</button>
//                 <button value="*" onClick={this.capture}>x</button>
//                 <button value="/" onClick={this.capture}>/</button>
//                 <br />
//                 {/* Submit */}
//                 <button onClick={this.submit}>=</button>
//                 <button onClick={this.clear}>C</button>
//                 <br />
//             </div>
//         )
//     }
// }

// export default Calculator;