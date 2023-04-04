import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  // 리다이렉트
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      navigate("/todo", { replace: true });
    }
  }, [navigate]);

  /*
    useRef는 React에서 DOM 요소에 대한 참조를 생성하기 위해 사용됩니다. 
    이 코드에서는 이메일과 비밀번호 입력란에 대한 참조를 생성하기 위해 useRef를 사용했습니다. 
    useRef를 사용하여 생성된 emailInput과 passwordInput 객체를 input 요소에 연결하면, input 요소의 값을 쉽게 가져올 수 있습니다. 
    또한 input 요소에 포커스를 이동시키기 위해 사용할 수도 있습니다.
  */
  const emailInput = useRef();
  const passwordInput = useRef();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  /*
  handleChangeState 함수는 입력한 이메일과 비밀번호 값을 state 객체에 업데이트합니다. 
  onChange 이벤트가 발생할 때마다 이 함수가 호출되어 입력한 값을 저장합니다. 
  handleChangeState 함수를 사용하여 state 객체에 입력한 값을 저장하면, React에서 상태 관리를 쉽게 할 수 있습니다.
  */

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // 회원가입 API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = "https://www.pre-onboarding-selection-task.shop/";
    try {
      await axios
        .post(
          `${BASE_URL}auth/signup`,
          {
            email: state.email,
            password: state.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((result) => {
          if (result.status === 201) {
            const data = result.data;
            localStorage.setItem("jwt", data.access_token);
            alert("회원가입이 완료되었습니다!");
            console.log(result);
            navigate("/signin", { replace: true });
          }
        });
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="Signup">
      <h1>회원가입</h1>
      <section>
        <div>이메일</div>
        <input
          ref={emailInput}
          name="email"
          value={state.email}
          data-testid="email-input"
          className="Signup_email"
          placeholder="이메일"
          onChange={handleChangeState}
        />
      </section>
      <section>
        <div>비밀번호</div>
        <input
          ref={passwordInput}
          name="password"
          value={state.password}
          data-testid="password-input"
          className="Signup_password"
          placeholder="8자 이상"
          type="password"
          onChange={handleChangeState}
        />
      </section>
      <button
        data-testid="signup-button"
        onClick={handleSubmit}
        disabled={!state.email.includes("@") || state.password.length < 8}
      >
        회원가입
      </button>
    </div>
  );
};

export default Signup;
