import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { request } from "../../utils/fetchApi";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import classes from "./categories.module.css";
import { MdOutlinePreview } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { viewicon, like, user, written } from "../../utils/icons.js";
import Button from "../Button/Button";
import noblog from "../../assets/noblog.gif";
import { plus, signout } from "../../utils/icons.js";

const Categories = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = [
    "all",
    "nature",
    "music",
    "travel",
    "design",
    "tec",
    "fun",
    "fashion",
  ];

  //Retrieve all the blogs 
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await request("/blog/getAll", "GET");
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  //Select the blog by categories
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs((prev) => {
        const filteredBlogs = blogs.filter(
          (blog) => blog.category.toLowerCase() === activeCategory.toLowerCase()
        );

        return filteredBlogs;
      });
    }
  }, [activeCategory]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h3>Select a category</h3>
        <div className={classes.categoriesAndBlogs}>
          <div className={classes.categories}>
            {categories.map((category) => (
              <span
                key={crypto.randomUUID()}
                className={`${classes.category} ${
                  activeCategory === category && classes.active
                }`}
                onClick={() => setActiveCategory((prev) => category)}
              >
                {category}
              </span>
            ))}
          </div>
          {filteredBlogs?.length > 0 ? (
            <div className={classes.blogs}>
              {filteredBlogs?.map((blog) => (
                <>
                  <div
                    class="row"
                    style={{ marginBottom: "170px", paddingLeft: "20px" }}
                  >
                    <div key={blog._id} className={classes.blog}>
                      <div
                        className={classes.group}
                        class="card-group"
                        style={{}}
                      >
                        <div
                          className="cardgroup"
                          class="card"
                          style={{
                            border: "2px solid #e6e6e6",
                            borderRadius: "20px",
                          }}
                        >
                          <Link
                            to={`/blogDetails/${blog?._id}`}
                            style={{ borderRadius: "20px" }}
                          >
                            <img
                              src={`http://localhost:5000/images/${blog?.photo}`}
                              style={{
                                width: "355px",
                                height: "200px",
                                borderRadius: "30px 30px 30px 30px",
                                padding: "10px",
                              }}
                            />
                          </Link>
                          <div class="card-body">
                            <div className={classes.categoryAndMetadata}>
                              <span className={classes.cardcategory}>
                                {blog?.category}
                              </span>
                              <div className={classes.metadata}>
                                {viewicon} {blog.views} views
                              </div>
                              <div className={classes.metadata}>
                                {like} {blog?.likes?.length} likes
                              </div>
                            </div>
                            <h4>
                              <b>{blog?.title}</b>
                            </h4>
                            {/* <p className={classes.blogDesc}>{blog?.desc}</p> */}

                            <Link
                              to={`/blogDetails/${blog._id}`}
                              className={classes.readMore}
                            >
                              Read More <FiArrowRight />
                            </Link>
                          </div>
                          <div
                            class="card-footer"
                            style={{
                              backgroundColor: "#ffe6f7",
                              borderRadius: "0px 0px 20px 20px",
                            }}
                          >
                            <div className={classes.authorAndCreatedAt}>
                              <span>
                                <span>{user}</span> {blog?.userId?.username}
                              </span>
                              <span>
                                <span>{written}</span> {format(blog?.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <Link to={`/blogDetails/${blog?._id}`}>
                      <img src={`http://localhost:5000/images/${blog?.photo}`} />
                    </Link>
                    <div className={classes.blogData}>
                      <div className={classes.categoryAndMetadata}>
                        <span className={classes.category}>{blog?.category}</span>
                        <div className={classes.metadata}>
                          <MdOutlinePreview /> {blog.views} views
                        </div>
                        <div className={classes.metadata}>
                          <AiFillLike /> {blog?.likes?.length} likes
                        </div>
                      </div>
                      <h4>{blog?.title}</h4>
                      <p className={classes.blogDesc}>
                        {blog?.desc}
                      </p>
                      <div className={classes.authorAndCreatedAt}>
                        <span><span>Author:</span> {blog?.userId?.username}</span>
                        <span><span>Created:</span> {format(blog?.createdAt)}</span>
                      </div>
                      <Link to={`/blogDetails/${blog._id}`} className={classes.readMore}>
                        Read More <FiArrowRight />
                      </Link>
                    </div> */}
                    </div>
                    <div class="column"></div>
                    <div class="column"></div>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <>
              <>
                <img
                  src={noblog}
                  alt="Third slide"
                  style={{ width: "300px", height: "300px", margin: "auto" }}
                />
                <h3 className={classes.noBlogsMessage}>
                  No any blogs at the moment
                </h3>
                <h5 style={{ margin: "auto", marginTop: "50px" }}>
                  Like to add ?
                </h5>
              </>
              <div
                style={{
                  backgroundColor: "#98e6e6",
                  borderRadius: "30px",
                  margin: "auto",
                  width: "130px",
                  marginTop: "10px",
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
