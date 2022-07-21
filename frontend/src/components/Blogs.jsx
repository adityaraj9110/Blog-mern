import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import BlogCard from "./BlogCard";
const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => {
          console.log(blog._id)
          return (
            <BlogCard
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            user={blog.user.name}
            isUser={localStorage.getItem("userId")===blog.user._id}
            id={blog._id}
            />
          );
        })}
    </div>
  );
};

export default Blogs;
