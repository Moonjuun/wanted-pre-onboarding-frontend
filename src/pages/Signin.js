const Signin = () => {
  return (
    <div>
      <h1>이 곳은 로그인 화면입니다</h1>
      <input data-testid="email-input" placeholder="이메일" />
      <input data-testid="password-input" placeholder="비밀번호" />
      <button data-testid="signup-button">회원가입</button>
    </div>
  );
};

export default Signin;
