// Array.prototype.reduce(callback, [initialValue]): 배열의 각 요소에 대해 콜백 함수를 실행.
// callback(accumulator(누적값 = 이전 콜백의 리턴값), currentValue, index, array)
// initialValue가 주어지면 누적값의 초기값으로 사용하고
// initialValue가 주어지지 않으면 배열의 첫번째 요소가 누적값의 초기값으로 사용되고, 두번째 요소부터 콜백 함수 호출

// 배열 요소 중 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = array.reduce((sum, num) => {
  if (num % 2 !== 0) {
    return sum + num; // 홀수일 때, sum에 num을 누적해서 반환
  } else {
    return sum; // 짝수일 때, 직전 sum을 그대로 반환
  }
}, 0);

var result = array.reduce((sum, num) => {
  return num % 2 ? sum + num : sum;
}, 0);

var result = array.reduce((sum, num) => (num % 2 ? sum + num : sum), 0);
var result = array.reduce((sum, num) => (sum += num % 2 && num), 0);

console.log(result);
