import './header.css'
import {Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
const Header  = (props) => {
  const [isLogged, setIsLogged] = useState(false)
  const toggleBtn = () =>{
    const logged = localStorage.getItem('token')
    if(!!logged){
      return setIsLogged(true)
    }
    setIsLogged(false)
  }
  window.addEventListener("storage",(e) => {
    toggleBtn()
 });
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
        { isLogged ? <p className="links" to='/' onClick={() => {localStorage.clear(); setIsLogged(false)}}>Logout</p> : <Link className="links" to='/login'>Login</Link>}
        <Link className="links" to="/register">Register</Link>

      </nav>
    </header>
    <div className='padding-one'>
    </div>
    </>

  )
}
export default Header;