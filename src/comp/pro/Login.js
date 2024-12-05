import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const idRef = useRef("");
  const pwRef = useRef("");

  const loginAction = () => {
    console.log("Login");

    const idValue = idRef.current.value;
    const pwValue = pwRef.current.value;
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
