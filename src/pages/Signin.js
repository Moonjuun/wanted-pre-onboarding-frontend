import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://pre-onboarding-selection-task.shop/auth/signin",
        {
          method: "POST",
          body: JSON.stringify({
            email: state.email,
            password: state.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwt", data.token);
        navigate("/todo");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
    }
  };

  return (
    <div className="Login">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <div>이메일</div>
          <input
            name="email"
            value={state.email}
            data-testid="email-input"
            className="Login_email"
            placeholder="이메일"
            onChange={handleChangeState}
          />
        </section>
        <section>
          <div>비밀번호</div>
          <input
            name="password"
            value={state.password}
            data-testid="password-input"
            className="Login_password"
            placeholder="비밀번호"
            type="password"
            onChange={handleChangeState}
          />
        </section>
        <button data-testid="login-button" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Signin;
