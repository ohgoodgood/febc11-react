import { useCallback, useEffect, useMemo, useState } from "react";
import Product from "./Product";
import Shipping from "./Shipping";
import { BeatLoader } from "react-spinners";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 흐름!!
// 처음 로드될 때(마운트 될 때)는 데이터가 없음. <h1> 부분만 렌더링됨.
// 마운트가 됐으므로 useEffect 및 셋업함수(fetchData)가 호출.
// useState가 데이터를 서버에서 받은 data로 업데이트하고, 리렌더링 진행. 이하 <div> 부분이 동적 렌더링됨.

function App() {
  console.log("App 렌더링.");

  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const axios = useAxiosInstance();

  const fetchData = async (_id) => {
    setIsLoading(true);

    try {
      const res = await axios.get(`/products/${_id}`);
      console.log("res: ", res);
      setData(res.data.item);
      setError(null);
    } catch (err) {
      console.error(err);
      setError({ message: "잠시 후 다시 요청하세요." });
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(7);
  }, []);

  const basicShippingFees = 3000;

  const [quantity, setQuantity] = useState(1);
  const [shippingFees, setShippingFees] = useState(basicShippingFees);

  // 수량이 변경되면 배송비 다시 계산
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setShippingFees(basicShippingFees * Math.ceil(newQuantity / 5));
    setQuantity(newQuantity);
  };

  const handlePayment = useCallback(() => {
    alert(`배송비 ${shippingFees}원이 추가됩니다. 상품을 결제하시겠습니까?`);
  }, [shippingFees]);

  return (
    <>
      <h1>02 Nike 상품 상세 조회 - Axios</h1>

      {isLoading && <BeatLoader />}

      {/*error && <p>{error.message}</p>*/}

      {data && (
        <div>
          <Product product={data} />

          <h2>수량 선택</h2>

          <div>
            가격: {data.price.toLocaleString()}원<br />
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
