import React from 'react'
import { Link } from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <div className='wrapper'>
      <ul className='navbar'>
        <li>
          <Link to="/">
            <h1>Blogs</h1>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default HeaderComponent