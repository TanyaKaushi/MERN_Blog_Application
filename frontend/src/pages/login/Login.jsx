import React, { Fragment } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../utils/fetchApi";
import classes from "./login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { plus, signout } from "../../utils/icons.js";
import Button from "../../components/Button/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("All the fields are required");
      return;
    }

    try {
      const options = {
        "Content-Type": "application/json",
      };

      const data = await request("/auth/login", "POST", options, {
        email,
        password,
      });
      console.log(data);
      dispatch(login(data));
      toast.success("Successfully login to the system");
      alert("Successfully login to the system");
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <ToastContainer></ToastContainer>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2 style={{ marginBottom: "60px" }}>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>
              {plus} <span>LOGIN</span>
            </button>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
