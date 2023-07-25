// importing modules
import React from 'react'
import { Routes, Route} from 'react-router-dom'

// importing components
import Blogs from '../pages/Blogs'
import BlogDetails from '../pages/BlogDetails'
import AuthorDetails from '../pages/AuthorDetails'
import BlogForm from '../pages/BlogForm'
import About from '../pages/About'
import Profile from '../pages/Profile'
 
const RoutesComponent  = () => {
  return (
    <>
      <Routes>
        <Route>
        <Route exact path="/" element={<Blogs />} />
        <Route exact path="/blog-details/:slug" element={<BlogDetails />} />
        <Route exact path="/author/:authorId" element={<AuthorDetails />} />
        <Route exact path="/blog-form" element={<BlogForm />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default RoutesComponent