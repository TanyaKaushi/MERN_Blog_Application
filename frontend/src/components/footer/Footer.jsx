import React from "react";
import classes from "./footer.module.css";
import bloglogo from "../../assets/blog-logo.png";
import { facebook, whatapp, insta, lindkin } from "../../utils/icons.js";

const Footer = () => {
  return (
    <footer>
      <div class="card text-center">
        <div class="card-header"></div>
        <div class="card-body">
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
          <p class="card-text">
            Connect with us on social media and update with the world
          </p>
          <a href="#">
            {facebook} {whatapp} {insta} {lindkin}
          </a>
        </div>
        <div class="card-footer text-muted">
          <div class="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>The Blog </span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
