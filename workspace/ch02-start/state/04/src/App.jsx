import { useState } from "react";
import EditAddress from "./components/EditAddress";
import { produce } from "immer";

function App() {
  const [user, setUser] = useState({
    _id: 4,
    email: "u1@market.com",
    name: "데이지",
    phone: "01044445555",
    address: "서울시 강남구 논현동 222",
    type: "user",
    createdAt: "2024.01.25 21:08:14",
    updatedAt: "2024.02.04 09:38:14",
    extra: {
      birthday: "11-30",
      membershipClass: "MC02",
      addressBook: [
        {
          id: 1,
          name: "회사",
          value: "서울시 강동구 천호동 123",
        },
        {
          id: 2,
          name: "집",
          value: "서울시 강동구 성내동 234",
        },
      ],
    },
  });

  const handleAddressChange = (event) => {
    // 상태의 불변성이 지켜지지 않음
    // const address = user.extra.addressBook.find(
    //   (address) => address.id === Number(event.target.name)
    // );
    // address.value = event.target.value;
    // const newState = { ...user };

    // 상태의 불변성을 지키기 위해 복잡한 추가 작업 필요
    // const newAddressBook = user.extra.addressBook.map((address) => {
    //   if (address.id === Number(event.target.name)) {
    //     return { ...address, value: event.target.value };
    //   } else {
    //     return address;
    //   }
    // });

    // const newState = {
    //   ...user,
    //   extra: {
    //     ...user.extra,
    //     addressBook: newAddressBook,
    //   },
    // };

    // immer를 사용해서 불변성 유지
    // immer의 produce 함수가 user를 복사한 새로운 객체(draft)에 변경사항을 반영하여 반환 (proxy 객체로 얕은복사를 먼저 해 둔 다음에, 변경된 state가 있는 경우 필요에 따라 선택적 깊은 복사 진행)
    const newState = produce(user, (draft) => {
      console.log(user);
      console.log(draft);
      const address = draft.extra.addressBook.find(
        (address) => address.id === Number(event.target.name)
      );
      address.value = event.target.value;
    });

    setUser(newState);

    // 기존 객체/배열과 분리된 새로운 객체/배열이 잘 생성되어 거기서 데이터가 변경되었는지 확인
    console.log("user", user === newState);
    console.log("user.extra", user.extra === newState.extra);
    console.log(
      "user.extra.addressBook",
      user.extra.addressBook === newState.extra.addressBook
    );
    console.log(
      "회사",
      user.extra.addressBook[0] === newState.extra.addressBook[0]
    );
    console.log(
      "집",
      user.extra.addressBook[1] === newState.extra.addressBook[1]
    );
    console.log(
      "회사 주소",
      user.extra.addressBook[0].value === newState.extra.addressBook[0].value
    );
    console.log(
      "집 주소",
      user.extra.addressBook[1].value === newState.extra.addressBook[1].value
    );
    console.log("기존 회사 주소", user.extra.addressBook[0].value);
  };

  return (
    <>
      <h2>04 상태관리 대상이 복합 객체일 경우 불변성 관리</h2>
      <p>
        이메일: {user.email}
        <br />
        이름: {user.name}
        <br />
        전화번호: {user.phone}
        <br />
      </p>
      <ul>
        {user.extra.addressBook?.map((address) => (
          <li key={address.id}>
            {address.name}: {address.value}
          </li>
        ))}
      </ul>
      <p>
        <EditAddress
          addressBook={user.extra.addressBook}
          handleAddressChange={handleAddressChange}
        />
      </p>
    </>
  );
}

export default App;
