import React from "react";
import classes from "./featuredBlogs.module.css";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import { MdOutlinePreview } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

const FeaturedBlogs = () => {
  return (
    <div className={classes.container} style={{ marginTop: "100px" }}>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" style={{ height: "600px" }}>
          <div class="carousel-item active">
            <img class="d-block w-100" src={img1} alt="First slide" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={img2} alt="Second slide" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={img3} alt="Third slide" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
