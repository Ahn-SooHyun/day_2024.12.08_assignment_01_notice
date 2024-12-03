import { useEffect, useState } from "react";

export default function Study() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [op, setOp] = useState("1");

  const result = () => {
    switch (op) {
      case "1":
        return Number(num1) + Number(num2); //type은 숫자다.
      case "2":
        return Number(num1) - Number(num2); //type은 숫자다.
      case "3":
        return Number(num1) * Number(num2); //type은 숫자다.
      case "4":
        return Number(num1) / Number(num2); //type은 숫자다.
    }
  };

  useEffect(() => {
    result();
  }, [num1, num2, op]);

  return (
    <div>
      <h1>계산기 State</h1>
      <input
        type="text"
        placeholder="First Num"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <select onChange={(e) => setOp(e.target.value)}>
        <option value="1">+</option>
        <option value="2">-</option>
        <option value="3">*</option>
        <option value="4">/</option>
      </select>
      <input
        type="text"
        placeholder="Second Num"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <h4>결과 : {result()}</h4>
    </div>
  );
}
