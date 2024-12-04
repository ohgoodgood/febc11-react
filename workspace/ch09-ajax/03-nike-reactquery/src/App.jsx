import { useCallback, useEffect, useMemo, useState } from "react";
import Product from "./Product";
import Shipping from "./Shipping";
import { BeatLoader } from "react-spinners";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery } from "@tanstack/react-query";

// 흐름!!
// 처음 로드될 때(마운트 될 때)는 데이터가 없음. <h1> 부분만 렌더링됨.
// 마운트가 됐으므로 useEffect 및 셋업함수(fetchData)가 호출.
// useState가 데이터를 서버에서 받은 data로 업데이트하고, 리렌더링 진행. 이하 <div> 부분이 동적 렌더링됨.

function App() {
  console.log("App 렌더링.");
  const axios = useAxiosInstance();

  // const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const fetchData = async (_id) => {
  //   setIsLoading(true);

  //   try {
  //     const res = await axios.get(`/products/${_id}`);
  //     console.log("res: ", res);
  //     setData(res.data.item);
  //     setError(null);
  //   } catch (err) {
  //     console.error(err);
  //     setError({ message: "잠시 후 다시 요청하세요." });
  //     setData(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(7);
  // }, []);

  // 상품 상세 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", 7], // 캐시에 사용될 키값을 임의로 지정 (여기서는 7번 상품)
    // 위 쿼리 키에 해당하는 데이터가 캐시에 있으면 가져오고, 없으면 아래 함수 실행
    queryFn: () => axios.get(`/products/7`), // 서버에 ajax 요청 전송 코드 (Promise 반환)
    select: (res) => res.data.item,
  });

  // 상품 구매
  const orderProduct = useMutation({
    // useMutation() 훅이 반환한 객체(orderProduct) 안의 mutate()를 호출하면 mutationFn이 호출됨
    // 조회(Get방식)와 달리, 사용자의 어떤 액션이 있을 때 호출되도록 하고 싶을 때 이렇게 useMutation 활용
    mutationFn: (products) => axios.post(`/orders`, products),

    // mutationFn 실행이 정상적으로 완료된 경우
    onSuccess: () => {
      toast.success("주문이 완료되었습니다.");
      refetch(); // useQuery를 다시 호출
    },
    // mutationFn 실행 중 에러가 발생한 경우
    onError: (err) => {
      // toast.error(err.message); interceptor에서 출력되도록 되어있음
      console.error(err);
    },
  });

  // 상품 구매
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["상품결제", 7], // 캐시에 사용될 키값을 임의로 지정 (여기서는 7번 상품)
  //   // 위 쿼리 키에 해당하는 데이터가 캐시에 있으면 가져오고, 없으면 아래 함수 실행
  //   queryFn: () =>
  //     axios.post(`/orders`, {
  //
  //     }), // 서버에 ajax 요청 전송 코드 (Promise 반환)
  //   select: (res) => res.data.item,
  // });

  console.log("isLoading", isLoading);
  console.log("error", error);
  console.log("data", data);

  const basicShippingFees = 3000;

  const [quantity, setQuantity] = useState(1);
  const [shippingFees, setShippingFees] = useState(basicShippingFees);

  // 수량이 변경되면 배송비 다시 계산
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setShippingFees(basicShippingFees * Math.ceil(newQuantity / 5));
    setQuantity(newQuantity);
  };

  const handlePayment = () => {
    const ok = confirm(
      `배송비 ${shippingFees}원이 추가됩니다. 상품을 결제하시겠습니까?`
    );

    if (ok) {
      // mutateFn() 호출
      orderProduct.mutate({
        products: [{ _id: 7, quantity }],
      });
    }
  };

  return (
    <>
      <h1>03 Nike 상품 상세 조회 - React Query</h1>

      {isLoading && <BeatLoader />}

      {/*error && <p>{error.message}</p>*/}

      {data && (
        <div>
          <Product product={data} />

          <h2>수량 선택</h2>

          <div>
            가격: {data.price.toLocaleString()}원<br />
            남은 수량: {data.quantity - data.buyQuantity}
            <br />
            수량:{" "}
            <input
              type="number"
              min="1"
              max={data.quantity - data.buyQuantity}
              value={quantity}
              onChange={handleQuantityChange}
            />
            (배송비는 5개당 {basicShippingFees.toLocaleString()}원씩
            추가됩니다.)
            <br />
            상품 금액: {(data.price * quantity).toLocaleString()}원
          </div>

          <Shipping fees={shippingFees} handlePayment={handlePayment} />
        </div>
      )}
      <ToastContainer
        theme="light"
        position="top-center"
        autoClose={1000}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        closeOnClick
        hideProgressBar={true}
        newestOnTop={false}
        transition={Slide}
      />
    </>
  );
}

export default App;
