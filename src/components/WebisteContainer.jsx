import {Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import Register from './register/Register'
import Dashboard from './movies/Dashboard'
import Home from './landingpage/LandingPage'
import AllMovies from './AllFAvoriteMovies'
import Header from './header/Header'
import { useState, useEffect } from 'react'
import Footer from './footer/Footer'
import Search from './search/Search'
const WebisteContainer = ()=> {
  const [activeMenu, setActiveMenu] = useState('menu')
  const toggleMenu = (e) =>{
    if(e.target.closest('.toggle-button')){
      return setActiveMenu(prev => prev === 'menu' ? 'menu active' : 'menu')
    }
    console.log('o')
    return setActiveMenu('menu')
  }
  useEffect(()=>{
    setActiveMenu('menu')
  }, [])
  return (
    <div onClick={toggleMenu}>
        <Header activeMenu={activeMenu}></Header>
        <Routes>
					<Route path="/" exact element={<Home/>} />
					<Route path="/login" exact element={<Login/>} />
					<Route path="/register" exact element={<Register/>} />
					<Route path="/all" exact element={<AllMovies/>} />
          <Route path='/search' exact element={<Search/>}/>
          <Route path="/trending/" exact element={<Dashboard key={'dash-in-app'}/>} />
          <Route path="/movie/:id" exact element={<Dashboard key={'dash-in-app'}/>} />

          			{/* <Route path="*" element={<Navigate to="/movie" />}/> */}
        </Routes>
        <Footer></Footer>
    </div>
  )
}

export default WebisteContainer