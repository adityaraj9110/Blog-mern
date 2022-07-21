import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddBlog from './components/AddBlog'
import Auth from './components/Auth'
import BlogDetail from './components/BlogDetail'
import Blogs from './components/Blogs'
import Header from './components/Header'
import UserBlog from './components/UserBlog'
import {useDispatch, useSelector} from 'react-redux'
import { authAction } from './store'

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn)
  useEffect(()=>{
    if(localStorage.getItem("userId")){
        dispatch(authAction.login());
    }
  },[dispatch])
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          {isLoggedIn?
            <>
            <Route path='/blogs' element={<Blogs/>}/>
            <Route path='/blogs/add' element={<AddBlog/>}/>
            <Route path='/myBlogs' element={<UserBlog/>}/>
            <Route path='/myBlogs/:id' element={<BlogDetail/>}/>
            </>
            :
            <Route path='/auth' element={<Auth/>}/>
          }
          
          
        </Routes>
      </main>
    </>
  )
}

export default App
