import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { noticeDetail, noticedEdit } from "../api/notice";
import "./noticeEdit.css";

export default function EditNotice() {
  const { id } = useParams(); // URL에서 id 가져오기
  const [notice, setNotice] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("CT_AT="))
      ?.split("=")[1];

    if (!cookieValue) {
      navigate("/Login");
      return;
    }
    fetchNoticeDetail(cookieValue);
  }, [navigate]);

  const fetchNoticeDetail = (cookieValue) => {
    let obj = {
      uuid: cookieValue,
      noticeIndex: id,
    };
    noticeDetail(obj)
      .then((res) => {
        setNotice(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notice detail:", err);
        setError("공지사항 정보를 가져오는 데 실패했습니다.");
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotice((prevNotice) => ({ ...prevNotice, [name]: value }));
  };

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

    noticedEdit({
      uuid: cookieValue,
      noticeIndex: id,
      title: notice.title,
      content: notice.content,
      category: notice.category,
    })
      .then(() => {
        alert("공지사항이 수정되었습니다.");
        navigate(`/NoticeDetail/${id}`);
      })
      .catch((err) => {
        console.error("Error updating notice:", err);
        alert("공지사항 수정에 실패했습니다.");
      });
  };

  if (loading) return <div className="edit-notice loading">로딩 중...</div>;
  if (error) return <div className="edit-notice error">{error}</div>;

  return (
    <div className="edit-notice">
      <h2>공지사항 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={notice.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">카테고리</label>
          <input
            type="text"
            id="category"
            name="category"
            value={notice.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={notice.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">저장</button>
        <button type="button" onClick={() => navigate(`/notices`)}>
          취소
        </button>
      </form>
    </div>
  );
}
