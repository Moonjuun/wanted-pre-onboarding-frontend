// Components
import Button from "../components/Button";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <div className="home_button">
        <Button
          text={"로그인"}
          type={"positive"}
          onClick={() => navigate("/signin")}
        ></Button>
        <Button
          text={"회원가입"}
          type={"positive"}
          onClick={() => navigate("/signup")}
        ></Button>
      </div>
    </div>
  );
};

export default Home;
