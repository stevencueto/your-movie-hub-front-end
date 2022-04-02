import {Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Login from './login/Login'
import Register from './register/Register'
import Dashboard from './movies/Dashboard'
import Home from './landingpage/LandingPage'
import AllMovies from './AllFAvoriteMovies'
import Header from './header/Header'
import React, { useState, useEffect } from 'react'
import Footer from './footer/Footer'
import Search from './search/Search'
import Playlists from './playlist/Playlists'
import MovieDescription from './movies/ShowMovies/MovieDescription'
import apiLink from './helpers'

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const WebisteContainer = ()=> {
  let query = useQuery();

  const [allMyPlaylists, setAllMyPlaylists] = useState([])
  const [addToPlalist, setAddToPlalist] = useState("")
  const getPlaylists = async() =>{
    if(!localStorage.getItem('token')) return 
    try{
      const request = await fetch(`${apiLink}playlist/user/`, {
          method: 'GET',
          headers: {
            'x-access-token': localStorage.getItem('token'),
          }
      })
      const response = await request.json()
      if (response.success) {
          setAllMyPlaylists(response.data)
          console.log(response.data)
      }else{
        setErrMessage(response.data)
      } 
    }catch(err){
        console.log(err)
        setErrMessage("server error")     
    }
  }

  const handleNewPlaylist = (e) => {
    const {name, value } = e.target;
    setNewPlaylist(prev => {
      return {
          ...prev,
          [name]: value
      }
    })
  }
  const addNewMovie = async(movie, playlist)=>{
    console.log(playlist, "in add movie")
    try{
        const request = await fetch(`${apiLink}playlist/add/${playlist}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(movie),
        })
        const response = await request.json()
        if (response.success) {
            console.log(response.data)
        } else{
            console.log(response.data)
        }
    }catch(err){
        console.log(err)
    }
  }
  const removeMovie = async(movie, playlist)=>{
    console.log(playlist,movie, "in remove movie")
    try{
        const request = await fetch(`${apiLink}playlist/remove/${playlist}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(movie),
        })
        const response = await request.json()
        if (response.success) {
            console.log(response.data)
        } else{
            console.log(response.data)
        }
    }catch(err){
        console.log(err)
    }
  }
  const editPlayListRequest = async(playlist) => {
    console.log(playlist)
    try{
      const request = await fetch(`${apiLink}playlist/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
          body: JSON.stringify(playlist),
      })
      const response = await request.json()
      if (response.success) {
          console.log(response.data)
          // navigate("/", { replace: true });
      }else{
        setErrMessage(response.data)
        console.log(response.data)
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

  const newPlaylistReq = async ()  => {
    try{
        const request = await fetch(`${apiLink}playlist/`, {
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
          <Route path="/playlist/" exact element={<Playlists editPlayListRequest={editPlayListRequest} newPlaylist={newPlaylist} handleNewPlaylist={handleNewPlaylist} newPlaylistReq={newPlaylistReq} errMessage={errMessage} allMyPlaylists={allMyPlaylists} removeMovie={removeMovie}/>} />
          <Route path="/movie/:id" exact element={<MovieDescription name={query.get("movie")} addToPlalist={addToPlalist} setAddToPlalist={setAddToPlalist} addNewMovie={addNewMovie} allMyPlaylists={allMyPlaylists} ></MovieDescription>} />
          

          			{/* <Route path="*" element={<Navigate to="/movie" />}/> */}
        </Routes>
        <Footer></Footer>
    </div>
  )
}

export default WebisteContainer