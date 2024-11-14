// Array.prototype.map(callback): 배열의 각 요소에 대해 콜백 함수를 실행.
// callback(elem, index)
// 호출되는 콜백함수가 반환하는 값을 요소로 하는 새로운 배열을 반환

// 배열 요소 중 홀수의 합을 구해 보자
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

var newArray = array.map((number) => {
  if (number % 2 !== 0) {
    return number;
  } else {
    return 0;
  }
});

var newArray = array.map((num) => (num % 2 ? num : 0));

newArray.forEach((number) => (result += number));

console.log(result);
