import React from "react";
import { useEffect, Fragment } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { request } from "../../utils/fetchApi";
import classes from "./updateBlog.module.css";
import { plus, signout } from "../../utils/icons.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBlog = () => {
  const [blogDetails, setBlogDetails] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    "nature",
    "music",
    "travel",
    "design",
    "tec",
    "fun",
    "fashion",
  ];

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(`/blog/find/${id}`, "GET", options);
        setBlogDetails(data);
        setTitle(data.title);
        setDesc(data.desc);
        setCategory(data.category);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    try {
      const options = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await request(`/blog/updateBlog/${id}`, "PUT", options, {
        title,
        desc,
        category,
      });
      toast.success("Successfully updated the blog");
      alert("Updated Successfully");
      navigate(`/blogDetails/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Fragment>
        <ToastContainer></ToastContainer>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <h2>Update Blog</h2>
            <form onSubmit={handleUpdateBlog}>
              <input
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Description..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={crypto.randomUUID()} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button type="submit">{plus} Update</button>
            </form>
          </div>
        </div>
        <Footer />
      </Fragment>
    </>
  );
};

export default UpdateBlog;
