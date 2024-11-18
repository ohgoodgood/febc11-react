import { useState } from "react";

function App() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [cellphone, setCellphone] = useState("010");

  const [user, setUser] = useState({
    name: "",
    email: "",
    cellphone: "010",
  });

  const [errors, setErrors] = useState({});

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handleCellphoneChange = (event) => {
  //   setCellphone(event.target.value);
  // };

  const handleChange = (event) => {
    const newUser = { ...user, [event.target.name]: event.target.value };
    setUser(newUser);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    let newErrors;
    if (user.name.trim() === "") {
      newErrors = {
        name: { message: "이름을 입력하세요." },
      };
    }

    if (newErrors) {
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <>
      <h1>05 회원가입 입력값 상태 관리</h1>

      <form>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <br />
        <div>{errors.name?.message}</div>

        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <br />
        <div>{errors.email?.message}</div>

        <label htmlFor="cellphone">휴대폰</label>
        <input
          id="cellphone"
          name="cellphone"
          value={user.cellphone}
          onChange={handleChange}
        />
        <br />
        <div>{errors.cellphone?.message}</div>

        <button type="submit">가입</button>
      </form>

      <p>
        이름: <br />
        이메일: <br />
        휴대폰: <br />
      </p>
    </>
  );
}

export default App;
