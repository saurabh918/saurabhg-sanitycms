// importing modules
import React from 'react'
import { Routes, Route} from 'react-router-dom'

// importing components
import Blogs from '../pages/Blogs'
import BlogDetails from '../pages/BlogDetails'
 
const RoutesComponent  = () => {
  return (
    <>
      <Routes>
        <Route>
        <Route exact path="/" element={<Blogs />} />
        <Route exact path="/blog-details/:slug" element={<BlogDetails />} />
        </Route>
      </Routes>
    </>
  )
}

export default RoutesComponent