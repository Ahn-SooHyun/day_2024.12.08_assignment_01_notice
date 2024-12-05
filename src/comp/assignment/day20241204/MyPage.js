import { useEffect, useState } from "react";

export default function MyPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  function loadData() {
    const id = localStorage.getItem("userId");
    const pw = localStorage.getItem("userPw");

    if (id !== "" && id !== null) {
      setId(id);
    }
    if (pw !== "" && pw !== null) {
      setPw(pw);
    }
  }

  // Equivalent to componentDidMount
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>My Profile</h1>
      <div>
        <strong>ID:</strong> {id}
      </div>
      <div>
        <strong>Password:</strong> {pw} {/* Displaying the password */}
      </div>
    </div>
  );
}
