import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const BlogDetail = () => {
  const id=useParams().id;
  console.log(id);
  const navigate= useNavigate();
  const [blog,setBlog]=useState();
  const [inputs,setInputs]=useState({
    // name:"",
    // description:""
  });
  const handleChange = (e)=>{
    setInputs((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
  }


  

  const fetchDetails = async ()=>{
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err.messages));
    const data =await res.data;
    console.log(data)
    return data;
    

  }
  
  
  useEffect(()=>{
    fetchDetails().then(data=>{
      setBlog(data.blog)
      setInputs({title:data.blog.title,description:data.blog.description})
    });
    
  },[id])

  const sendResponse = async()=>{
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    });
    const data=await res.data;
    return data;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs);
    sendResponse().then(data=>console.log(data))
    navigate("/myBlogs")
  }
  return (
    <div>blogdetails
      {inputs && <form onSubmit={handleSubmit}>
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

          <Button type="submit" variant="contained" color='warning' sx={{mt:2,borderRadius:4}}>Post</Button>
        </Box>
      </form>}
    </div>
  )
}

export default BlogDetail;
