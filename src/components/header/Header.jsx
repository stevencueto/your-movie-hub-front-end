import './header.css'
import {Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Header  = (props) => {
  return (
    <>
    <header className='header'>
      <div id="logo">
        <Link className="links logo-link" to="/">Your Movie Hub</Link>
      </div>
      <div className="toggle-button">
            <hr className="bar"/>
            <hr className="bar"/>
            <hr className="bar"/>
      </div>
      <nav className={props.activeMenu}>
        <Link className="links" to="/">Home</Link>
        {/* <Link className="links" to="/favorite-movies">Liked Movies</Link> */}
        <Link className="links" to="/search">Search</Link>
        { localStorage.getItem('token') ? <Link className="links" to='/' onClick={() => {localStorage.removeItem('token')}}>Logout</Link> : <Link className="links" to='/login'>Login</Link>}
        <Link className="links" to="/register">Register</Link>

      </nav>
    </header>
    <div className='padding-one'>
    </div>
    </>

  )
}
export default Header;