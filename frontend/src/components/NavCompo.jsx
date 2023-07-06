import React from "react";
import { Navbar, Container, Nav, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/userSlice";
const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    localStorage.removeItem("User");
    dispatch(register(null));
  };
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <NavLink to="/" className="link-light text-decoration-none">
            ChatApp
          </NavLink>
        </h2>
        {
          user && <span className="text-warning">Logged in as {user.name}</span>
        }
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user ? (
                <NavLink className="link-light text-decoration-none" to="/login" onClick={logOutHandler}>Logout</NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="link-light text-decoration-none"
                >
                 Login
                </NavLink>
                <NavLink
                  to="/resister"
                  className="link-light text-decoration-none"
                >
                  Register
                </NavLink>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
