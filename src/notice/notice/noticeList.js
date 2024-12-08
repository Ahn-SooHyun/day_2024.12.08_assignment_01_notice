// NoticeList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { noticeList } from "../api/notice";
import "./noticeList.css";

export default function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cookie에서 CT_AT 값 가져오기
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("CT_AT="))
      ?.split("=")[1];

    if (!cookieValue) {
      navigate("/Login");
      return;
    }

    // 데이터 가져오기
    fetchNotices(cookieValue);
  }, [navigate]);

  const fetchNotices = (cookieValue) => {
    let obj = new Object();
    obj.uuid = cookieValue;
    obj.category = category;
    obj.title = title;

    const startNoticeList = noticeList(obj);

    startNoticeList
      .then((res) => {
        setNotices(res.data.data || []); // 데이터 배열 확인 후 설정
        setLoading(false);
      })
      .catch((err) => {
        setError("데이터를 가져오는 데 실패했습니다.");
        setLoading(false);
      });
  };

  const handleSearch = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("CT_AT="))
      ?.split("=")[1];

    if (!cookieValue) {
      navigate("/Login");
      return;
    }

    fetchNotices(cookieValue);
  };

  const addition = () => {
    navigate("/NoticeAddition");
  };

  if (loading) return <div className="notice-list loading">로딩 중...</div>;
  if (error) return <div className="notice-list error">{error}</div>;

  const handleDetail = (id) => {
    navigate(`/NoticeDetail/${id}`);
  };

  return (
    <div className="notice-list">
      <h2>게시판</h2>
      <div className="search-options">
        <input
          type="text"
          placeholder="카테고리 검색"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="타이틀 검색"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
        <button onClick={addition}>추가</button>
      </div>
      <table className="notice-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>타이틀</th>
            <th>카테고리</th>
            <th>작성자</th>
            <th>좋아요</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <tr
                key={notice.noticeIndex}
                onClick={() => handleDetail(notice.noticeIndex)}
              >
                <td>{index + 1}</td>
                <td>{notice.title}</td>
                <td>{notice.category}</td>
                <td>{notice.userIdx}</td>
                <td>{notice.good}</td>
                <td>{new Date(notice.userDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                값이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
