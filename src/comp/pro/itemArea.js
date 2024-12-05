//아이템 리스트 영역
export default function AreaItem(props) {
  const item = props.item;
  const index = props.index;

  return (
    <div
      key={index}
      style={{
        border: "2px solid blue",
        width: "400px",
        margin: "10px",
        cursor: "pointer",
      }}
    >
      IDX: {item.itemIdx}
      <br />
      NAME: {item.name}
      <br />
      가격: {item.price}
      <br />
      추천: {item.good}
      <br />
      카테고리 이름:{item.categoryName}
      <br />
      카테고리 idx: {item.categoryId}
      <br />
    </div>
  );
}
