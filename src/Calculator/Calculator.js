import React, { Component } from 'react';

class Calculator extends Component {
    state = {
        input: []
    }

    capture = (event) => {
        this.setState({
            ...this.state,
            input: [...this.state.input, event.target.value]
        })
    }

    submit = () => {
        //TODO: eval() should be replaced - find a better method
        console.log(eval(this.state.input.join("")));
    }

    clear = () => {
        this.setState({
            ...this.state,
            input: []
        })
    }

    render() {
        console.log(this.state.input);

        return (
            <div>
                <h2>Calculator</h2>
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
            </div>
        )
    }
}

export default Calculator;