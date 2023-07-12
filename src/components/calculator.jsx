import React, { useState } from "react";

export default function Calculator() {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");

    const ops = ['/', '*', '-', '+', '.'];

    const createDigits = () => {
        const digits = [];

        for (let i = 1; i < 10; i++) {
            digits.push(<button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>);
        }

        return digits;
    }

    const updateCalc = (value) => {
        let newCalc = calc;

        if (!newCalc && value === "-") {
            newCalc = "-";
        } else if (value === "." && !newCalc.slice(-1).match(/[0-9]/)) {
            newCalc += "0.";
        } else if (value === "." && !newCalc.includes(".")) {
            newCalc += ".";
        } else if (value === "-" && ops.includes(newCalc.slice(-1))) {
            newCalc += "-";
        } else if (ops.includes(value) && ops.includes(newCalc.slice(-1))) {
            newCalc = newCalc.slice(0, -1) + value;
        } else if (ops.includes(value) && !newCalc) {
            return;
        } else {
            newCalc += value;
        }

        setCalc(newCalc);

        try {
            let result = eval(newCalc);
            if (Number.isFinite(result)) {
                setResult(result.toString());
            } else {
                setResult("");
            }
        } catch (err) {
            setResult("");
        }
    };
    const calculate = () => {
        console.log("calculate called");
        if (calc === "") return;

        try {
            const result = eval(calc);
            if (Number.isFinite(result)) {
                setCalc(eval(calc).toString());
                setResult(result.toFixed(2).toString())
            } else {
                alert("kos nagoo momen")
                setResult("");
            }
        } catch (err) {
            setResult("");
        }

    }

    const deleteLast = () => {
        if (calc === "") return;

        const newCalc = calc.slice(0, -1);
        setCalc(newCalc);

        try {
            const result = eval(newCalc);
            if (Number.isFinite(result)) {
                setResult(result.toString());
            } else {
                setResult("");
            }
        } catch (err) {
            setResult("");
        }
    };
    const clearAll = () => {
        setCalc("");
        setResult("");
    };
    return (
        <div className="App">
            <div className="calculator">
                <div className="display">
                    <span>{result ? '(' + result + ')' : ''}</span> {calc || 0}
                </div>

                <div className="operators">
                    <button onClick={clearAll}>AC</button>
                    <button onClick={() => updateCalc('/')}>/</button>
                    <button onClick={() => updateCalc('*')}>x</button>
                    <button onClick={() => updateCalc('-')}>-</button>
                    <button onClick={() => updateCalc('+')}>+</button>
                    <button onClick={deleteLast}>DEL</button>
                </div>

                <div className="digits">
                    {createDigits()}
                    <button onClick={() => updateCalc('0')}>0</button>
                    <button onClick={() => updateCalc('.')}>.</button>
                    <button onClick={calculate}>=</button>
                </div>
            </div>
        </div>
    )
}

