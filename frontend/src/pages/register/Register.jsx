import React, { Fragment } from "react";
import classes from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { request } from "../../utils/fetchApi";
import { register } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { plus, signout } from "../../utils/icons.js";
import Button from "../../components/Button/Button";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      toast.error("All the fields are required");
      return;
    }

    try {
      const options = { "Content-Type": "application/json" };

      const data = await request("/auth/register", "POST", options, {
        username,
        email,
        password,
      });
      dispatch(register(data));
      alert("success register");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <ToastContainer></ToastContainer>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2 style={{ marginBottom: "60px" }}>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username..."
              onChange={(e) => setUsername(e.target.value)}
            />
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
            {/* <button type="submit">Register</button> */}
            <button>
              {plus} <span>REGISTER</span>
            </button>
            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
