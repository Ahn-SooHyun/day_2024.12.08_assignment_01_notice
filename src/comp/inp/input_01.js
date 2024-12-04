import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InputStudy() {
  const [inp, setInp] = useState("");
  const navigate = useNavigate();

  function send() {
    localStorage.setItem("study", inp);
    navigate("/Oup1");
  }

  return (
    <div>
      <h1>Input Study</h1>
      <input type="text" value={inp} onChange={(e) => setInp(e.target.value)} />
      <input type="button" value="Send" onClick={send} />
    </div>
  );
}
