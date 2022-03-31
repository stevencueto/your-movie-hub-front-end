import {Route, Routes, useNavigate } from 'react-router-dom'
import Login from './login/Login'
import Register from './register/Register'
import Dashboard from './movies/Dashboard'
import Home from './landingpage/LandingPage'
import AllMovies from './AllFAvoriteMovies'
import Header from './header/Header'
import { useState, useEffect } from 'react'
import Footer from './footer/Footer'
import Search from './search/Search'
import Playlists from './playlist/Playlists'

const WebisteContainer = ()=> {
  const [allMyPlaylists, setAllMyPlaylists] = useState([])
  const getPlaylists = async() =>{
    if(!localStorage.getItem('token')) return 
    try{
      const request = await fetch(`https://yourmoviehubapi.herokuapp.com/playlist/user/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          }
      })
      const response = await request.json()
      if (response.success) {
          console.log(response.data, "data")
          // navigate("/", { replace: true });
      }else{
        setErrMessage(response.data)
      } 
    }catch(err){
        console.log(err)       
    }
  }


  
  const [errMessage, setErrMessage] = useState("")
	let navigate = useNavigate();

  const [newPlaylist , setNewPlaylist] = useState(
    {
      name: "",
      description: ""
    }
  )

  const handleNewPlaylist = (e) => {
    const {name, value } = e.target;
    setNewPlaylist(prev => {
      return {
          ...prev,
          [name]: value
      }
    })
  }

  const newPlaylistReq = async (e)  => {
    e.preventDefault()
    try{
        const request = await fetch(`https://yourmoviehubapi.herokuapp.com/playlist/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(newPlaylist),
        })
        const response = await request.json()
        if (response.success) {
            setNewPlaylist({
                name: "",
                description: ""
              })
            console.log(response.data)
            window.location.reload(false);
            // navigate("/", { replace: true });
        }else{
          setErrMessage(response.data)
        } 
    }catch(err){
        console.log(err)       
    }
  }
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
    getPlaylists()
  }, [])
  return (
    <div onClick={toggleMenu} id="website-container">
        <Header activeMenu={activeMenu}></Header>
        <Routes>
					<Route path="/" exact element={<Home/>} />
					<Route path="/login" exact element={<Login/>} />
					<Route path="/register" exact element={<Register/>} />
					<Route path="/all" exact element={<AllMovies/>} />
          <Route path='/search' exact element={<Search/>}/>
          <Route path="/trending/" exact element={<Dashboard key={'dash-in-app'}/>} />
          <Route path="/playlist/" exact element={<Playlists newPlaylist={newPlaylist} handleNewPlaylist={handleNewPlaylist} newPlaylistReq={newPlaylistReq} errMessage={errMessage}/>} />
          <Route path="/movie/:id" exact element={<Dashboard key={'dash-in-app'}/>} />

          			{/* <Route path="*" element={<Navigate to="/movie" />}/> */}
        </Routes>
        <Footer></Footer>
    </div>
  )
}

export default WebisteContainer