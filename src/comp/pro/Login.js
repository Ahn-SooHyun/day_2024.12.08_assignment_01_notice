import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { memberLogin } from "../api/member";

export default function Login() {
  const navigate = useNavigate();

  const idRef = useRef("");
  const pwRef = useRef("");

  useEffect(() => {
    localStorage.removeItem("userId");
  }, []);

  const loginAction = () => {
    console.log("Login");

    const idValue = idRef.current.value;
    const pwValue = pwRef.current.value;

    let obj = new Object();
    obj.userId = idValue;
    obj.iserPw = pwValue;

    memberLogin(obj).then((res) => {
      console.log(res);
      const data = res.data;
      if (data.code === "200" && data.data === "Y") {
        //다음 페이지 이동
        console.log("success");
        localStorage.setItem("userId", idValue); //권한 등록
        localStorage.setItem("auto", "random UUID JWT");
        navigate("/ProItemList"); //아이템 리스트 이동
      } else {
        idRef.current.value = "";
        pwRef.current.value = "";
        idRef.current.focus();
        alert("정보를 다시 입력해주세요.");
      }
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="ID" ref={idRef} />
      <br />
      <input type="password" placeholder="PW" ref={pwRef} />
      <br />
      <input
        type="button"
        value="Register"
        onClick={() => {
          navigate("/ProJoin");
        }}
      />
      <input type="button" value="Login" onClick={loginAction} />
    </div>
  );
}
