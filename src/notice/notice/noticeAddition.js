import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { noticedAddition } from "../api/notice";
import "./noticeAddition.css";

export default function NoticeAddition() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("CT_AT="))
      ?.split("=")[1];

    if (!cookieValue) {
      navigate("/Login");
      return;
    }

    let obj = new Object();
    obj.uuid = cookieValue;
    obj.title = title;
    obj.category = category;
    obj.content = content;

    console.log(obj);

    noticedAddition(obj)
      .then(() => {
        alert("공지사항이 추가되었습니다.");
        navigate("/NoticeList"); // 공지사항 목록 페이지로 이동
      })
      .catch((err) => {
        console.error("Error adding notice:", err);
        alert("값을 정상적으로 입력하세요.");
      });
  };

  return (
    <div className="add-notice">
      <h2>공지사항 추가</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">카테고리</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">추가</button>
        <button type="button" onClick={() => navigate("/NoticeList")}>
          취소
        </button>
      </form>
    </div>
  );
}
