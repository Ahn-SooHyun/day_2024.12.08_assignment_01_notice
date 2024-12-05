import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/member";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  function loginCK() {
    let obj = new Object();
    obj.userId = id;
    obj.userPw = pw;

    const startLogin = login(obj);

    startLogin.then((res) => {
      //로그인 성공일때
      if (res.data.data === "Y") {
        localStorage.setItem("userId", obj.userId);
        localStorage.setItem("userPw", obj.userPw);
        navigate("/Assignment_20241204_MyPage");
      } else if (res.data.data === "N") {
        alert("로그인 실패! 입력을 다시해주세요");
      }
    });

    startLogin.catch((err) => {
      console.log("로그인 에러");
      console.log(err);
    });
  }

  return (
    <div>
      <label htmlFor="id">ID</label>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <br />

      <label htmlFor="pw">PW</label>
      <input
        type="password"
        value={pw}
        placeholder="PW"
        onChange={(e) => {
          setPw(e.target.value);
        }}
      />
      <br />

      <input type="button" value="Login" onClick={loginCK} />
    </div>
  );
}
