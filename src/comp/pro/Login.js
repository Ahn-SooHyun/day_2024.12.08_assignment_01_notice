import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="ID" />
      <br />
      <input type="password" placeholder="PW" />
      <br />
      <input
        type="button"
        value="Register"
        onClick={() => {
          navigate("/ProJoin");
        }}
      />
      <input type="button" value="Login" />
    </div>
  );
}
