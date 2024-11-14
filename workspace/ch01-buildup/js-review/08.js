// 지정한 수가 소수인지 여부를 반환
var isPrime = memo(function (num) {
  console.time("소요 시간");
  console.log("소수 판별 시작.", num);

  // TODO: 소수 판별 코드
  let prime = num > 1; // 1은 소수가 아님

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }

  console.log("소수 판별 결과.", prime);
  console.timeEnd("소요 시간");
  return prime;
});

// var isPrime = function (num) {
//   // 캐시를 위한 코드
//   isPrime._cache = isPrime._cache || {};
//   if (isPrime._cache[num] !== undefined) {
//     console.log("cache hit!", num, isPrime._cache[num]);
//     // 캐시 되어 있는 경우 (cache hit)
//     return isPrime._cache[num];
//   } else {
//     // 캐시 안 되어 있는 경우
//     // 소수 판별 코드
//     return (isPrime._cache[num] = isPrime2(num));
//   }
// };

// cache 및 memoization은 순수함수(함수 내부로 전달되는 매개변수에 의해서만 값이 달라지는 함수)에 대해서만 의미가 있다. 전역변수 등의 함수 외부의 요소에 의해 결과값이 달라지는 함수는 순수함수가 아님!

// 지정한 함수에 memoization 기능 추가 (범용성)
function memo(fn) {
  return function (args) {
    fn._cache = fn._cache || {};
    if (fn._cache[args] !== undefined) {
      console.log("cache hit!", args, fn._cache[args]);
      return fn._cache[args];
    } else {
      return (fn._cache[args] = fn(args));
    }
  };
}

// var isPrime = memo(isPrime); // memoization 기능 추가

isPrime(1);
isPrime(2);
isPrime(3);
isPrime(4);
isPrime(5);
isPrime(6);
isPrime(7);
isPrime(8);
isPrime(9);
isPrime(1000000007);
isPrime(1000000007);
isPrime(1000000007);
