// Array.prototype.find(callback): 배열의 각 요소에 대해 콜백 함수를 실행.
// callback(elem, index)
// true를 반환하는 첫번째 콜백 함수에 전달된 요소를 반환
// true를 반환하는 콜백 함수가 없으면 undefined 반환

// 배열 요소 중 2와 3의 최소공배수 구하기
var array = [6, 7, 8, 1, 2, 4, 5, 3, 9, 10];
array.sort((a, b) => a - b);
// 음수를 반환할 경우 a, b로 정렬
// 양수를 반환할 경우 b, a로 정렬
// 0을 반환할 경우 그대로

console.log(array);

var result = array.find((num) => num % 2 === 0 && num % 3 === 0);

console.log(result);
