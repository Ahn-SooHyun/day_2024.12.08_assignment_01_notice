// src/pages/LoginPage.jsx
import React, { useState } from "react";
import "./Login.css";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    let obj = new Object();
    obj.id = id;
    obj.pw = pw;

    const startLogin = login(obj);

    startLogin.then((res) => {
      if ((res.data.code = "200")) {
        // 당일 자정 시간 계산
        const now = new Date();
        const midnight = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
          0,
          0,
          0
        );
        const expires = `Expires=${midnight.toUTCString()}`;

        // 쿠키에 CT_AT 저장 (자정까지 유효)
        document.cookie = `CT_AT=${res.data.data}; ${expires}; path=/;`;
        alert("로그인 성공!");
        navigate("/NoticeList");
      } else {
        alert("로그인 실패: " + res.data.message);
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
