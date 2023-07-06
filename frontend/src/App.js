import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./pages/SignUp";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavCompo";
import { register } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Messenger from "./components/Messenger";
import SignUp from "./pages/SignUp";
import UserProvider from "./context/UserProvider";
import AccountProvider from "./context/AccountProvider";
import Home from "./pages/Home";
function App() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  // let user = useSelector((state) => state.user.user);
  let user={};
  useEffect(() => {
      user = JSON.parse(localStorage.getItem("User"));
    dispatch(register(user));
  }, []);
  return (
    <>
      {/* <Messenger/> */}
      <Container className="App">
        
        <Routes>
          <Route path="/" element={user?<Home/>:<Navigate to="/login"/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
