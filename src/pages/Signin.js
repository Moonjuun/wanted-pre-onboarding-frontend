import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();

  // 리다이렉트
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo", { replace: true });
    }
  }, [navigate]);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://pre-onboarding-selection-task.shop/auth/signin",
        {
          email: state.email,
          password: state.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("jwt", data.access_token);
        console.log(response);
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
