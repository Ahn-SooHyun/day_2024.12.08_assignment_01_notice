import { useEffect, useState } from "react";

export default function OutStudy() {
  const [msg, setMsg] = useState("");

  function start() {
    const data = localStorage.getItem("study");
    if (data !== "" && data !== "null") {
      setMsg(data);
    }
  }

  //처음 화면이 마운트 되었을 때 ( java이벤트 핸들러 : OnLoad 하고 비슷하다. )
  useEffect(() => {
    start();
  }, []);

  return (
    <div>
      <h1>Out Study</h1>
      {msg}
    </div>
  );
}
