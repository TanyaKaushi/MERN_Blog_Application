import React, { useState, useContext, Fragment } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import classes from "./create.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { request } from "../../utils/fetchApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { plus, signout } from "../../utils/icons.js";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const categories = [
    "nature",
    "music",
    "travel",
    "design",
    "tec",
    "fun",
    "fashion",
  ];

  const onChangeFile = (e) => {
    setImg(e.target.files[0]);
  };

  const handleCloseImg = () => {
    setImg(null);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    if (title === "" || desc === "" || category === "") {
      toast.error("All the fields are required");
      return;
    }

    try {
      const formData = new FormData();

      let filename = null;
      if (img) {
        filename = crypto.randomUUID() + img.name;
        formData.append("filename", filename);
        formData.append("image", img);

        await fetch(`http://localhost:5000/upload`, {
          method: "POST",
          body: formData,
        });
        toast.success("Success");
        alert("Posted");
      } else {
        return;
      }

      const options = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const body = {
        title,
        desc,
        category,
        photo: filename,
      };

      const data = await request("/blog", "POST", options, body);
      navigate(`/blogDetails/${data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <ToastContainer></ToastContainer>
      <Navbar />
      <div className={classes.container} style={{ marginTop: "80px" }}>
        <div className={classes.wrapper}>
          <h2 className={classes.title} style={{ marginTop: "30px" }}>
            Create Blog
          </h2>
          <form onSubmit={handleCreateBlog} encType="multipart/form-data">
            <div className={classes.inputWrapper}>
              {/* <label>Title: </label> */}
              <input
                type="text"
                placeholder="Title..."
                className={classes.input}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              {/* <label>Description: </label> */}
              <textarea
                type="text"
                placeholder="Description..."
                className={classes.input}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapperSelect}>
              {/* <label>Category: </label> */}
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
            </div>
            <div className={classes.inputWrapperImg}>
              <label htmlFor="image" className={classes.labelFileInput}>
                Image: <span>Upload here</span>
              </label>
              <input
                id="image"
                type="file"
                className={classes.input}
                onChange={onChangeFile}
                style={{ display: "none" }}
              />
              {img && (
                <p className={classes.imageName}>
                  {img.name}{" "}
                  <AiOutlineCloseCircle
                    className={classes.closeIcon}
                    onClick={() => handleCloseImg()}
                  />
                </p>
              )}
            </div>
            <div className={classes.buttonWrapper}>
              <button className={classes.submitBtn} type="submit">
                {plus} Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Create;
