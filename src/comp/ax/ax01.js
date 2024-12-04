import axios from "axios";
import { useState } from "react";

export default function AX1() {
  const [area, setArea] = useState([]);

  function axios_01() {
    console.log("==============================");
    console.log("        Axios Get 방식");
    console.log("==============================");

    axios
      .get("http://localhost:8080/api/area/list") //방식(URL)
      .then((res) => {
        console.log(res);
        if (res.data.code == "200") {
          setArea(res.data.data);
        }
      }); //성공

    //Promise 라는 JavaScript 기능하고 비슷.
    //ES 6 문법

    // const aa = new Promise(resolve, reject);
  }

  return (
    <div>
      <h1>Axios 연습</h1>
      <input type="button" value="get 방식" onClick={axios_01} />
    </div>
  );
}
