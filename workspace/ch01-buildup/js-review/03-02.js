var item = { no: 1, todo: "두부", done: true };

// 1. 대입 연산자로 newItem 생성
var newItem = item;
// 객체의 값 자체가 아니라 주소가 복사됨

// 별개의 사본으로 복사하려면, 다른 주소를 가진 새로운 객체로 만들어야 함. 빈 객체를 하나 새로 만들고 기존 객체의 속성을 그 안에 모두 추가하는 방식.

// 2. Object.assign() 사용해서 속성 추가
// Object.assign(target, ...source): target 객체에 source 객체들의 속성을 추가해서 target을 반환
var newItem = Object.assign(item, { delete: true });
var newItem = Object.assign({}, item, { delete: true });

// 3. item의 속성을 가져다가 새로운 객체 생성
var newItem = { no: item.no, done: item.done, todo: item.todo };

// 4. 전개연사자를 사용
var newItem = { ...item, done: false };

// item과 newItem 비교
// newItem.done = false;
console.log(item, newItem);
console.log("같은 객체인가?", item === newItem);
