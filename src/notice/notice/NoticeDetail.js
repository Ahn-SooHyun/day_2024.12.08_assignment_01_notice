import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { noticeDetail, noticeGood, noticedDelete } from "../api/notice";
import "./noticeDetail.css";

export default function NoticeDetail() {
  const { id } = useParams(); // URL에서 id 가져오기
  const [notice, setNotice] = useState(null);
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
    handleFetchDetail(cookieValue);
  }, [id, navigate]);

  const handleFetchDetail = (cookieValue) => {
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

  const handleGoodClick = () => {
    if (notice) {
      setNotice((prevNotice) => ({
        ...prevNotice,
        good: prevNotice.good + 1,
      }));
    }

    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("CT_AT="))
      ?.split("=")[1];

    if (!cookieValue) {
      navigate("/Login");
      return;
    }

    let obj = {
      uuid: cookieValue,
      noticeIndex: id,
    };

    noticeGood(obj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditClick = () => {
    navigate(`/NoticeEdit/${id}`); // 수정 페이지로 이동
  };

  const handleDeleteClick = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("CT_AT="))
      ?.split("=")[1];

    if (!cookieValue) {
      navigate("/Login");
      return;
    }

    let obj = {
      uuid: cookieValue,
      noticeIndex: id,
    };

    noticedDelete(obj)
      .then(() => {
        alert("공지사항이 삭제되었습니다.");
        navigate("/NoticeList"); // 목록 페이지로 이동
      })
      .catch((err) => {
        console.error("Error deleting notice:", err);
        alert("공지사항 삭제에 실패했습니다.");
      });
  };

  if (loading) return <div className="notice-detail loading">로딩 중...</div>;
  if (error) return <div className="notice-detail error">{error}</div>;

  return (
    <div className="notice-detail">
      <h2>상세보기</h2>
      {notice ? (
        <div className="notice-content">
          <h3>{notice.title}</h3>
          <div className="inline-items">
            <p>
              <strong>카테고리:</strong> {notice.category}
            </p>
            <p>
              <strong>작성자:</strong> {notice.userIdx}
            </p>
            <p>
              <strong>좋아요:</strong>{" "}
              <button onClick={handleGoodClick}>{notice.good}</button>
            </p>
          </div>
          <p>
            <strong>작성일자:</strong>{" "}
            {new Date(notice.userDate).toLocaleDateString()}{" "}
            {notice.yn == "true" ? (
              <>
                <button onClick={handleEditClick}>수정</button>{" "}
                <button onClick={handleDeleteClick}>삭제</button>
              </>
            ) : (
              <></>
            )}
          </p>
          <div className="notice-body">{notice.content}</div>
        </div>
      ) : (
        <div className="notice-detail error">값이 없습니다.</div>
      )}
    </div>
  );
}
