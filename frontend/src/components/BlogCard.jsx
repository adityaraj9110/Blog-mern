import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const BlogCard = ({title,description,imageURL,user,isUser,id}) => {
  const navigate= useNavigate()
  const handleEdit = (e)=>{
    
    navigate(`/myBlogs/${id}`)

  }
  const deleteRequest = async()=>{
    const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
    const data = await res.data;
    return data;
  }
  const handleDelete = (e)=>{
    deleteRequest().then(()=>navigate('/')).then(()=>navigate('/blogs'))
  }
  console.log(title,isUser)
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          '&:hover': {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display={'flex'}>
            <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}><ModeEditIcon color="warning"/></IconButton>
            <IconButton onClick={handleDelete} ><DeleteIcon color='error'/></IconButton>

          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user.split(" ")[0][0]}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        
        <CardContent>
        <hr />
        <br />
          <Typography variant="body2" color="text.secondary">
            <b>{user}</b>: {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCard;
