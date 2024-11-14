// Array.prototype.forEach(callback): 배열의 각 요소에 대해 콜백 함수를 실행
// callback(elem, index)
// 반환값은 없음

// 배열 요소 중 홀수의 합을 구해 보자
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

array.forEach((number) => {
  if (number % 2 === 1) {
    result += number;
  }
});

console.log(result);
