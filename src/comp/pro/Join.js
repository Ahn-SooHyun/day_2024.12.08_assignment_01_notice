import { useEffect, useState } from "react";
import { memberIdCheck, areaList } from "../api/member";

export default function Study() {
  const [id, setId] = useState(""); //ID
  const [pw, setPw] = useState(""); //PW
  const [name, setName] = useState(""); //Name
  const [email, setEMail] = useState(""); //E-Mail
  const [birth, setBirth] = useState(""); //Birth
  const [gender, setGender] = useState("M"); //Gender
  const [area, setArea] = useState(""); //지역

  const [areas, setAreas] = useState([]); //지역 리스트

  useEffect(() => {
    startList();
  }, []); //페이지가 처음으로 불러오는 현상 (마운트) 이 때만 동작 되게 해달라!

  //랜더링이 더 이상 ( 개발자가 생각한 외에 발생 될 시 )
  // useEffect, useMemp, useCallBack 이 부분을 추가 !!!! 없으면 그냥 건들지 바세요 .!
  // 위의 기능들은 랜더를 억제하는 것을 목적 !!! 많으면 많을수록 사이트가 느려집니다.
  //화면이 처음 출력 되었을 때, list에 어떻게 표현 시킬 것인가?
  function startList() {
    console.log("=== startList");
    areaList().then((res) => {
      console.log(res);
      setAreas(res.data.data); // select 지역리스트 추가
      setArea(res.data.data[0].areaIdx); // 지역코드 기본값 ( 첫 번재 index )
    });
  }

  /**
   * 회원가입 시 작동 되도록
   */
  function joinAction() {
    //유효성 검사
    //javaScript유효성 검사 코드

    //값 담는다.
    const obj = {
      userId: id,
      userPw: pw,
      userName: name,
      email: email,
      birth: birth,
      gender: gender,
      areaIdx: areas,
    };
  }

  return (
    <div>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <input
        type="button"
        value="중복 체크"
        onClick={() => {
          let obj = new Object();
          obj.id = id;

          const check = memberIdCheck(obj);

          //성공
          check.then((res) => {
            console.log("========================");
            console.log("         성공");
            console.log(res);
          });

          //실패
          check.catch((err) => {
            console.log(err);
          });
        }}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Input you're PW"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Input you're Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <input
        type="email"
        placeholder="Input you're E-Mail"
        value={email}
        onChange={(e) => setEMail(e.target.value)}
      />
      <br />
      <br />
      <input
        type="date"
        placeholder="Input you're Birth"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
      />
      <br />
      <br />
      <input
        type="radio"
        id="male"
        value="M"
        name="gender"
        checked={gender === "M"}
        onChange={(e) => setGender(e.target.value)}
      />
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        id="female"
        value="F"
        name="gender"
        checked={gender === "F"}
        onChange={(e) => setGender(e.target.value)}
      />
      <label htmlFor="female">Female</label>
      <br />
      <br />
      지역코드
      <select onChange={(e) => setArea(e.target.value)}>
        {areas.map((item, index) => (
          <option key={index} value={item.idx}>
            {item.areaName}
          </option>
        ))}
      </select>
      <br />
      <br />
      <br />
      {/* submit은 유효성 검사가 힘들다. */}
      <input type="button" value="회원가입" onClick={joinAction} />
    </div>
  );
}
