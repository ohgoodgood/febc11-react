var itemList = [
  { no: 1, todo: "두부", done: false },
  { no: 2, todo: "계란", done: false },
  { no: 3, todo: "라면", done: false },
];

// 1. 대입연산자
var newItemList = itemList;

// 2. 전개연산자를 이용한 (얕은) 복사
var newItemList = [...itemList];
// 새로운 배열로 복사되기는 하지만, 그 안의 데이터가 객체들이라서, 여전히 같은 주소를 가리키고 있다

// 3. 객체(참조형 데이터)를 속성으로 가지는 대상은 깊은 복사를 해야 함(속성도 새로운 객체로 복사해야 함)
newItemList[1] = { ...itemList[1] };

// 수정사항 발생
newItemList[1].done = true;
// 두 배열 비교
console.log(itemList, newItemList);
console.log("같은 배열인가?", itemList === newItemList);
console.log(itemList[1] === newItemList[1]);
