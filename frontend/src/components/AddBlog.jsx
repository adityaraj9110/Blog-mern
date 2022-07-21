import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const sendRequest= async()=>{
    const res = await axios.post("http://localhost:5000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch(err=>console.log(err))
    const data = res.data;
    return data;
  }
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs)
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"))
    
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          borderRadius={10}
          border={3}
          borderColor="radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          marginLeft="auto"
          marginRight={"auto"}
          marginTop={3}
          display="flex"
          flexDirection="column"
          width="80%"
        >
          <Typography
            
            fontWeight="blod"
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField name="title" margin="auto" variant="outlined" value={inputs.title} onChange={handleChange} />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField name="description" margin="auto" variant="outlined" value={inputs.description} onChange={handleChange} />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField name="imageURL" margin="auto" variant="outlined" value={inputs.imageURL} onChange={handleChange} />
          <Button type="submit" variant="contained" color='warning' sx={{mt:2,borderRadius:4}}>Post</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
