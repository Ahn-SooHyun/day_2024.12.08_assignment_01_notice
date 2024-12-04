import axios from "axios";
import { useRef, useState } from "react";

export default function AX1() {
  const [area, setArea] = useState([]);
  const text = useRef(); // 변수를 가상 dom에만 저장을 하고요. 랜더 현상 X
  //사용자에게 변화 되는 데이터를 보여줄 필요가 없지만.
  //데이터는 저장

  const text2 = useRef();

  function axios_Get_01() {
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
      }) //성공
      .catch((err) => console.error("Axios GET 요청 에러:", err)); // 에러 처리 추가

    //Promise 라는 JavaScript 기능하고 비슷.
    //ES 6 문법

    // const aa = new Promise(resolve, reject);
  }

  //useRef

  function axios_Get_02() {
    console.log(text.current.value);
    // text.current.focus();
    const params = {
      id: text.current.value,
    };

    console.log(params);

    axios
      .get("http://localhost:8080/api/area/byId", { params }) // 파라미터 동적으로 전달
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error("Axios GET 요청 에러:", err)); // 에러 처리 추가
  }

  function axios_Post_01() {
    axios.post("http://localhost:8080/api/member/list").then((res) => {
      console.log(res.data);
    });
  }

  function axios_Post_02() {
    const obj = {
      id: text2.current.value,
    }; // {"id" : "Hello World"}

    axios
      .post("http://localhost:8080/api/member/findId", JSON.stringify(obj), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <div>
      <h1>Axios 연습</h1>

      <h4>==========================================</h4>
      <h4>Get 방식</h4>
      <input type="button" onClick={axios_Get_01} value="get방식" />
      <br />
      <input type="text" ref={text} />
      <input type="button" onClick={axios_Get_02} value="get방식 2" />
      <br />
      <br />

      <h4>==========================================</h4>
      <h4>Post 방식</h4>
      {/* method // 전송 방법: method, GET, POST ( TOMCAT은 GET, POST만 지원 ) */}
      <input type="button" onClick={axios_Post_01} value="Post 방식" />
      <br />
      <input type="text" ref={text2} />
      <input type="button" onClick={axios_Post_02} value="post 방식2" />
    </div>
  );
}
