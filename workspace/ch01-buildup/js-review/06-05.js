function f1() {
  return new Promise((resolve, reject) => {
    console.log(`2. f1 작업 시작.`);
    console.log(`3. f1 작업중...`);

    setTimeout(() => {
      // ......
      console.log(`4. f1 작업 종료.`);
      resolve(`f1의 결과물`);
      // reject(new Error("에러 발생"));
    }, 1000);
  });
}

function f2(f1Result) {
  return new Promise((resolve, reject) => {
    console.log(`5. ${f1Result}로 f2 작업 시작.`);
    console.log(`6. f2 작업중...`);

    setTimeout(() => {
      // ......
      console.log(`7. f2 작업 종료.`);
      resolve(`최종 결과물`);
      // reject(new Error("에러 발생"));
    }, Math.random() * 2000);
  });
}

async function test() {
  try {
    const f1Result = await f1();
    const result = await f2(f1Result);
    console.log("8", result);
  } catch (err) {
    console.error(err);
  }
}

console.log("1. 테스트 시작.");
test();
console.log("9. 테스트 완료."); // 그냥 동기함수로 작성했을 때와, async/await로 동기함수'처럼' 작성했을 때의 차이는, test()가 수행되는 동안 이 라인이 먼저 수행/반환되는지 아닌지 여부이다!
