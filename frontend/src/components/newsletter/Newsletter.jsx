import React from "react";
import classes from "./newsletter.module.css";
import { FiSend } from "react-icons/fi";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import { MdOutlinePreview } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

const Newsletter = () => {
  return (
    <div className={classes.container} style={{ marginTop: "150px" }}>
      <div className={classes.wrapper}>
        <h3>Featured Blogs</h3>
        <div className={classes.blogs}>
          <div className={classes.left}>
            <div className={classes.mainBlog}>
              <img src={img1} alt="" />
              <div className={classes.mainBlogData}>
                <div className={classes.categoryAndMetadata}>
                  <span className={classes.category}>Nature</span>
                  <div className={classes.metadata}>
                    <MdOutlinePreview /> 123 views
                  </div>
                  <div className={classes.metadata}>
                    <AiFillLike /> 100 likes
                  </div>
                </div>
                <h4>Blog 1 title</h4>
                <p className={classes.blogDesc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  corrupti harum quidem.
                </p>
                <div className={classes.authorAndCreatedAt}>
                  <span>
                    <span>Author:</span> Villy
                  </span>
                  <span>
                    <span>Created:</span> 27-02-2023
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.secondaryBlog}>
              <img src={img2} alt="" />
              <div className={classes.secondaryBlogData}>
                <h4>Blog 2 title</h4>
                <p className={classes.desc}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Odit, hic inventore? Atque?
                </p>
                <div className={classes.authorAndCreatedAt}>
                  <span>
                    <span>Author:</span> Villy
                  </span>
                  <span>
                    <span>Created:</span> 27-02-2023
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.secondaryBlog}>
              <img src={img3} alt="" />
              <div className={classes.secondaryBlogData}>
                <h4>Blog 3 title</h4>
                <p className={classes.desc}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Odit, hic inventore? Atque?
                </p>
                <div className={classes.authorAndCreatedAt}>
                  <span>
                    <span>Author:</span> Villy
                  </span>
                  <span>
                    <span>Created:</span> 27-02-2023
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
