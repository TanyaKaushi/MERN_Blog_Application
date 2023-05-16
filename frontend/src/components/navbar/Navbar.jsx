import React, { Fragment } from "react";
import classes from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { plus, signout } from "../../utils/icons.js";
import Button from "../Button/Button";
import styled from "styled-components";
import bloglogo from "../../assets/blog-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  // signout from the application
  const handleSignout = async () => {
    try {
      toast.success("Sign Out from the system");
      alert("Sign out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Fragment>
        <ToastContainer></ToastContainer>
        <nav
          class="navbar fixed-top navbar-light bg-light justify-content-between"
          style={{ padding: "10px 100px 10px 100px", margin: "auto" }}
        >
          <a class="navbar-brand" href="/home">
            <img
              src={bloglogo}
              width="120"
              height="60"
              class="d-inline-block align-top"
              alt=""
            />
            {/* Bootstrap */}
          </a>
          <form class="form-inline">
            <div
              className="submit-btn"
              style={{
                backgroundColor: "#2db9b9",
                borderRadius: "30px",
                textDecoration: "none",
              }}
            >
              <Link to="/create">
                <Button
                  name={"Create"}
                  icon={plus}
                  bPad={".8rem 1.6rem"}
                  bRad={"30px"}
                  bg={"var(--color-accent"}
                  color={"#fff"}
                />
              </Link>
            </div>
            <div style={{ backgroundColor: "#C38EB4", borderRadius: "30px" }}>
              <Link to="/" style={{ color: "none" }}>
                <Button
                  name={"Signout"}
                  icon={signout}
                  bPad={".8rem 1.6rem"}
                  bRad={"30px"}
                  bg={"var(--color-accent"}
                  color={"#fff"}
                  onClick={handleSignout}
                />
              </Link>
            </div>
          </form>
        </nav>
      </Fragment>
    </div>
  );
};

export default Navbar;
