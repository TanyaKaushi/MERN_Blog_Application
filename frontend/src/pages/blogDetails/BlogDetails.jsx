import React from "react";
import { useState, Fragment } from "react";
import classes from "./blogDetails.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { request } from "../../utils/fetchApi";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { format } from "timeago.js";
import {
  AiFillEdit,
  AiFillLike,
  AiFillDelete,
  AiOutlineArrowRight,
  AiOutlineLike,
} from "react-icons/ai";
import { back } from "../../utils/icons.js";
import { edit, trash } from "../../utils/icons.js";
import Button from "../../components/Button/Button";
import { viewicon, like } from "../../utils/icons.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

//Get blog detail for relevant blog
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(`/blog/find/${id}`, "GET", options);
        setBlogDetails(data);
        setIsLiked(data.likes.includes(user._id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  // like for the blog
  const handleLikePost = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/likeBlog/${id}`, "PUT", options);
      setIsLiked((prev) => !prev);
      toast.success("You liked it");
      alert("You liked it");
    } catch (error) {
      console.error(error);
    }
  };

  // delete
  const handleDeleteBlog = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/deleteBlog/${id}`, "DELETE", options);
      toast.success("Successfully delete the blog.");
      alert("Successfully Delete the blog");
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Fragment>
        <ToastContainer></ToastContainer>
        <div className={classes.container} style={{ marginTop: "200px" }}>
          <Link
            to="/home"
            className={classes.goBack}
            style={{ marginTop: "80px" }}
          >
            {back} Go Back
          </Link>
          <div className={classes.wrapper}>
            <h1 className={classes.title}>{blogDetails?.title}</h1>

            <img src={`http://localhost:5000/images/${blogDetails?.photo}`} />
            <div className={classes.titleAndControls}>
              {blogDetails?.userId?._id === user._id ? (
                <div className={classes.controls}>
                  <Link
                    to={`/updateBlog/${blogDetails?._id}`}
                    className={classes.edit}
                  >
                    <Button
                      name={"Edit Post"}
                      icon={edit}
                      bPad={".8rem 1.6rem"}
                      bRad={"30px"}
                      bg={"var(--color-accent"}
                      color={"#fff"}
                    />
                  </Link>
                  <div className={classes.delete}>
                    <Button
                      name={"Delete Post"}
                      icon={trash}
                      bPad={".8rem 1.6rem"}
                      bRad={"30px"}
                      bg={"var(--color-accent"}
                      color={"#fff"}
                      onClick={handleDeleteBlog}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {isLiked ? (
                    <div className={classes.like}>
                      <AiFillLike onClick={handleLikePost} />
                    </div>
                  ) : (
                    <div className={classes.like}>
                      <AiOutlineLike onClick={handleLikePost} />
                    </div>
                  )}
                </>
              )}
            </div>

            <div className={classes.likesAndViews}>
              <span>
                {" "}
                {viewicon} {blogDetails?.views} views
              </span>
              <span>
                {" "}
                {like} {blogDetails?.likes?.length} likes
              </span>
            </div>
            <div className={classes.descAndLikesViews}>
              <p className={classes.desc}>{blogDetails?.desc}</p>
            </div>
            <div className={classes.authorAndCreatedAt}>
              <span>
                <span> Author:</span> {blogDetails?.userId?.username}
              </span>
              <span>
                <span> Created At:</span> {format(blogDetails?.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    </>
  );
};

export default BlogDetails;
