import { useEffect, useState } from "react";
import { itemList, itemgood } from "../api/item";
import ItemArea from "./itemArea";

export default function Study() {
  const [items, setItems] = useState([]);
  const [categoryId, setCategortId] = useState(0);
  const [keyword, setKeyword] = useState("");

  const catagoryLists = [
    { id: "0", name: "ALL" },
    { id: "1", name: "도서" },
    { id: "2", name: "전자" },
    { id: "3", name: "생활" },
  ];

  //JavaScript의 오버로딩
  //Java는 오버로딩이 필요한 갯수만큼 method를 만들면.
  //JavaScript는 필요 없으면 생략.
  function startItemList(param) {
    itemList(param).then((res) => {
      if (res.data.code == 200) {
        setItems(res.data.data);
      }
    });
  }

  async function changeItem(idx) {
    let obj = new Object();
    obj.itemIdx = idx;
    await itemgood(obj).then((res) => {
      //axios 호출 좋아요 DB 호출
      console.log(res);
    });

    const copyItems = [...items];
    copyItems[idx - 1] = {
      ...copyItems[idx - 1],
      good: copyItems[idx - 1].good + 1,
    };
    setItems(copyItems);
  }

  //useState가 변화를 감지할 경우, 해당 event가 동작 되도록 정의
  //이 부분 사용 할 때, [무한루프] 조심 하세요.
  useEffect(() => {
    searchBtn();
  }, [keyword, categoryId]);

  function categoryNum(num) {
    setCategortId(num);
  }

  function searchBtn() {
    let param = new Object();
    param.keyword = keyword;
    param.categoryIdx = categoryId;

    startItemList(param);
  }

  return (
    <div>
      <h1>아이템 리스트</h1>
      {/** 카테고리 리스트 */}
      {catagoryLists.map((item, index) => (
        <div key={index}>
          <a
            onClick={(e) => {
              e.preventDefault(); //html 기본기능 멈추게 하기
              categoryNum(item.id);
            }}
          >
            {item.name}
          </a>
        </div>
      ))}
      <br />

      <input
        type="text"
        placeholder="검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input type="button" value="검색" onClick={searchBtn} />

      {/** 아이템 리스트 */}
      {items.map((item, index) => (
        <ItemArea
          key={index}
          item={item}
          index={index}
          onGoodUp={(idx) => {
            changeItem(idx);
          }}
        ></ItemArea>
      ))}
    </div>
  );
}
