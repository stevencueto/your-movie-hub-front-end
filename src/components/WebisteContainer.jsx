import {Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Login from './login/Login'
import Register from './register/Register'
import Dashboard from './movies/Dashboard'
import Home from './landingpage/LandingPage'
import Header from './header/Header'
import React, { useState, useEffect } from 'react'
import Footer from './footer/Footer'
import Search from './search/Search'
import Playlists from './playlist/Playlists'
import MovieDescription from './movies/ShowMovies/MovieDescription'
import apiLink from './helpers'
import { OnePlaylist } from './playlist/OnePlaylist'
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const WebisteContainer = ()=> {
  const [cleanupFunction, setCleanupFuction] = useState(false)
  let query = useQuery();
  const [allMyPlaylists, setAllMyPlaylists] = useState([])
  const [addToPlalist, setAddToPlalist] = useState("")
  const [errMessage, setErrMessage] = useState("")
	let navigate = useNavigate();
  const handleAPICall = (response, thingToSet) =>{
    if (response.success) {
      thingToSet(response.data)
      setErrMessage('')
    }else{
      setErrMessage(response.data)
    } 
  }

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
      handleAPICall(response, setAllMyPlaylists)
    }catch(err){
        setErrMessage("server error")     
    }
  }
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
  const addNewMovie = async(movie, playlist)=>{
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
          const newPlaylist = allMyPlaylists.map(one => one._id === playlist ? response.data : one)
          setAllMyPlaylists(newPlaylist)
          navigate("/playlist", { replace: true })
          setErrMessage('')
        } else{
          setErrMessage(response.data)
        }
    }catch(err){
        setErrMessage("server error")
    }
  }
  const removeMovie = async(movie, playlist)=>{
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
          const newPlaylist = allMyPlaylists.map(one => one._id === playlist ? response.data : one)
          setAllMyPlaylists(newPlaylist)
          setErrMessage('')
        } else{
          setErrMessage(response.data)
        }
    }catch(err){
        setErrMessage('server error')
    }
  }
  const editPlayListRequest = async(playlist) => {
    try{
      const request = await fetch(`${apiLink}playlist/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
          body: JSON.stringify(playlist),
      })
      const response = await request.json();
      if(response.success){
        const newPlaylist = allMyPlaylists.map(one => one._id === playlist._id ? response.data : one)
        setAllMyPlaylists(newPlaylist)
      }else{
        setErrMessage(response.data)
      }
    }catch(err){
      setErrMessage("server error")
    }
  }


  const deletePlayListRequest = async(playlist) => {
    try{
      const request = await fetch(`${apiLink}playlist/delete/${playlist._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
          },
      })
      const response = await request.json();
      if(response.success){
        const newPlaylist = allMyPlaylists.filter((onePlay) => {return onePlay._id !== playlist._id})
        setErrMessage("")
        setAllMyPlaylists(newPlaylist)
      }else{
        setErrMessage(response.data)
      }
    }catch(err){
      setErrMessage("server error")
    }
  }
  
 
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
              setAllMyPlaylists(prev=>[response.data, ...prev])
              setErrMessage('')
        }else{
          setErrMessage(response.data)
        } 
    }catch(err){
      setErrMessage("server error")
    }
  }
  const [activeMenu, setActiveMenu] = useState('menu')
  const toggleMenu = (e) =>{
    if(e.target.closest('.toggle-button')){
      return setActiveMenu(prev => prev === 'menu' ? 'menu active' : 'menu')
    }
    return setActiveMenu('menu')
  }
  useEffect(()=>{
    setCleanupFuction(true)
    setActiveMenu('menu')
    getPlaylists()
    return ()=>{
      setCleanupFuction(false)
    }
  }, [])
  return (
    <div onClick={toggleMenu} id="website-container">
        <Header activeMenu={activeMenu}></Header>
        <Routes>
					<Route path="/" exact element={<Home/>} />
					<Route path="/login" exact element={<Login/>} />
					<Route path="/register" exact element={<Register/>} />
          <Route path='/search' exact element={<Search/>}/>
          <Route path="/explore" exact element={<Dashboard key={'dash-in-app'}/>} />
          <Route path="/playlist" exact element={<Playlists deletePlayListRequest={deletePlayListRequest} editPlayListRequest={editPlayListRequest} newPlaylist={newPlaylist} handleNewPlaylist={handleNewPlaylist} newPlaylistReq={newPlaylistReq} errMessage={errMessage} allMyPlaylists={allMyPlaylists} removeMovie={removeMovie}/>} />
          <Route path="/movie/:id" exact element={<MovieDescription name={query.get("movie")} addToPlalist={addToPlalist} setAddToPlalist={setAddToPlalist} addNewMovie={addNewMovie} allMyPlaylists={allMyPlaylists} ></MovieDescription>} />
          <Route path='/playlist/:id' exact element={<OnePlaylist name={query.get("playlist")}/>}/>
        </Routes>
        <Footer></Footer>
    </div>
  )
}

export default WebisteContainer