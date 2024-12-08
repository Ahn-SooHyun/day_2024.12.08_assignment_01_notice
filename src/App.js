import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Login from "./notice/login/login";

import NoticeList from "./notice/notice/noticeList";
import NoticeDetail from "./notice/notice/noticeDetail";
import NoticeEdit from "./notice/notice/noticeEdit";
import NoticeAddition from "./notice/notice/noticeAddition";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/Login"} element={<Login />} />
          <Route path={"/NoticeList"} element={<NoticeList />} />
          <Route path="/NoticeDetail/:id" element={<NoticeDetail />} />
          <Route path="/NoticeEdit/:id" element={<NoticeEdit />} />
          <Route path="/NoticeAddition" element={<NoticeAddition />} />
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
      <Link to="/Login">Login으로 이동</Link>
      <br />
    </div>
  );
}

export default App;
