import { useState } from "react";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const evaluateExpression = (expr) => {
    if (!expr) return "Error";

    const tokens = expr.match(/(\d+|\+|-|\*|\/)/g);
    if (!tokens) return "Error";

    //Handle * and /
    let stack = [];
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
      if (token === "*" || token === "/") {
        const a = Number(stack.pop());
        const b = Number(tokens[i + 1]);
        if (token === "*") stack.push(a * b);
        else {
          if (b === 0 && a === 0) return NaN;
          if (b === 0) return Infinity;
          stack.push(a / b);
        }
        i += 2;
      } else {
        stack.push(token);
        i++;
      }
    }

    //Handle + and -
    let result = Number(stack[0]);
    for (let j = 1; j < stack.length; j += 2) {
      const op = stack[j];
      const num = Number(stack[j + 1]);
      if (op === "+") result += num;
      else result -= num;
    }

    return result;
  };

  const handleEqual = () => {
    const output = evaluateExpression(expression);
    setResult(output.toString());
  };

  const buttons = [
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "*",
    "C",
    "0",
    "=",
    "/",
  ];

  return (
    <div style={{ width: "260px", margin: "50px auto", textAlign: "center" }}>
      <h1>React Calculator</h1>
      <input
        type="text"
        value={expression}
        readOnly
        style={{
          width: "75%",
          height: "15px",
          fontSize: "1rem",
          marginBottom: "10px",
          textAlign: "left",
          paddingRight: "10px",
        }}
      />
      <div
        style={{
          color: "gray",
          marginBottom: "10px",
        }}
      >
        {result}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }}
      >
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (btn === "C") handleClear();
              else if (btn === "=") handleEqual();
              else handleClick(btn);
            }}
            style={{
              height: "45px",
              fontSize: "1.1rem",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
