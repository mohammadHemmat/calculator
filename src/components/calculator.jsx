import React, { useState, useEffect } from "react";


export default function Calculator() {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState([]);
    const [keyPressed, setKeyPressed] = useState("");

    const ops = ["/", "*", "-", "+", "."];

    const createDigits = () => {
        const digits = [];

        for (let i = 1; i < 10; i++) {
            digits.push(
                <button
                    className={`btn ${keyPressed === i.toString() ? "btn" : ""}`}
                    onClick={() => updateCalc(i.toString())}
                    key={i}
                >
                    {i}
                </button>
            );
        }

        return digits;
    };

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
                setResult(result.toFixed(2).toString());
                setHistory([...history, { calculation: calc, result: result.toFixed(2) }]);
            } else {
                alert("kos nagoo momen");
                setResult("");
            }
        } catch (err) {
            setResult("");
        }
    };

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

    const handleHistoryItemClick = (item) => {
        setCalc(item.calculation);
        setResult(item.result);
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;
            setKeyPressed(key);
            if (key === "Enter") {
                calculate();
            } else if (key === "Backspace" || key === "Delete") {
                deleteLast();
            } else if (key === "Escape") {
                clearAll();
            } else if (/^[0-9]$/.test(key)) {
                updateCalc(key);
            } else if (ops.includes(key)) {
                updateCalc(key);
            }
        };

        const handleKeyUp = () => {
            setKeyPressed("");
        };

        document.addEventListener("keydown", handleKeyPress);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [calc, deleteLast, clearAll]);

    return (
        <div className="App">
            <div className="calculator">
                <div className="history-container ">
                    <h2 className="text-history">History</h2>
                    <ul className="history">
                        {history.map((item, index) => (
                            <li key={index} onClick={() => handleHistoryItemClick(item)}>
                                {item.calculation} = {item.result}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="display">
                    <span>{result ? "(" + result + ")" : ""}</span>{calc || 0}
                </div>

                <div className="operators">
                    <button className="ac btn-below" onClick={clearAll}>
                        AC
                    </button>
                    <button className={`btn-below ${keyPressed === "*" ? "btn-below" : ""}`} onClick={() => updateCalc("/")}>
                        /
                    </button>
                    <button className={`btn-below ${keyPressed === "*" ? "btn-below" : ""}`} onClick={() => updateCalc("*")}>
                        x
                    </button>
                    <button className={`btn-below ${keyPressed === "-" ? "btn-below" : ""}`} onClick={() => updateCalc("-")}>
                        -
                    </button>
                    <button className={`btn-below ${keyPressed === "+" ? "btn-below" : ""}`} onClick={() => updateCalc("+")}>
                        +
                    </button>
                    <button className="delete btn-below btn-rangi" onClick={deleteLast}>
                        DEL
                    </button>
                </div>

                <div className="digits">
                    {createDigits()}
                    <button className={`btn-below ${keyPressed === "0" ? "btn-below" : ""}`} onClick={() => updateCalc("0")}>
                        0
                    </button>
                    <button className={`btn-below ${keyPressed === "." ? "btn-below" : ""}`} onClick={() => updateCalc(".")}>
                        .
                    </button>
                    <button className={`btn-below ${keyPressed === "Enter" ? "btn-below" : ""}`} onClick={calculate}>
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}