import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Calc1 from "./comp/calc/Study_01";
import Inp1 from "./comp/inp/input_01";
import Oup1 from "./comp/inp/output_01";
import Ax1 from "./comp/ax/ax01";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <About />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/cal1"} element={<Calc1 />} />

          <Route path={"/Inp1"} element={<Inp1 />} />
          <Route path={"/Oup1"} element={<Oup1 />} />

          <Route path={"/Ax1"} element={<Ax1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Start Home</h1>
      <br />
      <br />
      <Link to="/about">About으로 이동</Link>
      <br />
      <Link to="/cal1">Cal1로 이동하기</Link>
      <br />

      <h4>데이터 옮기기</h4>
      <Link to="/Inp1">Inp1로 이동하기</Link>
      <br />
      <h4>데이터 출력</h4>
      <Link to="/Oup1">Oup1로 이동하기</Link>
      <br />

      <h4> Axios</h4>
      <Link to="/ax1">Axios 사용</Link>
    </div>
  );
}

function About() {
  return (
    <div style={{ border: "2px blue solid" }}>
      <Link to="/">Home으로 이동</Link>
    </div>
  );
}

export default App;
