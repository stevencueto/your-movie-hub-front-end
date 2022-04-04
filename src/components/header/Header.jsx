import './header.css'
import {Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../../images/logo.png'

function useForceUpdate(){
  const [value, setValue] = useState(); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}




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

 useEffect(()=>{
  toggleBtn()
 }, [])
  return (
    <>
    <header className='header'>
      <div id="logo">
        <Link className="links logo-link" to="/"><img src={logo} alt="" /></Link>
      </div>
      <div className="toggle-button">
            <hr className="bar"/>
            <hr className="bar"/>
            <hr className="bar"/>
      </div>
      <nav className={props.activeMenu}>
        {!isLogged ? <Link className="links" to="/">Home</Link> :  null}
        {/* <Link className="links" to="/favorite-movies">Liked Movies</Link> */}
        <Link className="links" to="/search">Search</Link>
        <Link className="links" to="/explore">Explore</Link>
        <Link className="links" to="/playlist/">Playlists</Link>
        { isLogged ? <p className="links" to='/' onClick={() => {localStorage.clear(); setIsLogged(false)}}>Logout</p> : <Link className="links" to='/login'>Login</Link>}
        { !isLogged && <Link className="links" to="/explore">Register</Link>}

      </nav>
    </header>
    <div className='padding-one'>
    </div>
    </>

  )
}
export default Header;