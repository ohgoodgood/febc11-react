import { useCallback, useEffect, useMemo, useState } from "react";
import Product from "./Product";
import Shipping from "./Shipping";
import { BeatLoader } from "react-spinners";

// 흐름!!
// 처음 로드될 때(마운트 될 때)는 데이터가 없음. <h1> 부분만 렌더링됨.
// 마운트가 됐으므로 useEffect 및 셋업함수(fetchData)가 호출.
// useState가 데이터를 서버에서 받은 data로 업데이트하고, 리렌더링 진행. 이하 <div> 부분이 동적 렌더링됨.

function App() {
  console.log("App 렌더링.");

  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const fetchData = async (_id) => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://11.fesp.shop/productsasdf/${_id}?delay=3000`,
        {
          headers: { "client-id": "00-nike" },
        }
      );
      console.log("res: ", res);
      const jsonData = await res.json();
      console.log("jsonData: ", jsonData);

      if (res.ok) {
        setData(jsonData.item);
        setError(null);
      } else {
        setError(jsonData);
        setData(null);
      }
    } catch (err) {
      console.error(err);
      setError({ message: "잠시 후 다시 요청하세요." });
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(4);
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
      <h1>01 Nike 상품 상세 조회</h1>

      {isLoading && <BeatLoader />}

      {error && <p>{error.message}</p>}

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
    </>
  );
}

export default App;
