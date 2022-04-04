import {useState, useEffect, useRef} from 'react'
import  fakePoster from '../../../images/not-movie-pic.jpeg'
import PlotAndMore from './PlotAndMore'
import AddToPlayLists from './AddToPlayLists'
import apiLink from '../../helpers'
import './moviedescription.css'
import CastAndCrew from './CastAndCrew'
import Trailer from './Trailer'
import {useNavigate } from 'react-router-dom'
import * as jose from 'jose'

function MovieDescription({name, addNewMovie, allMyPlaylists, addToPlalist}) {
  const posterRef = useRef(false)
  const [movie, setMovie] = useState([])
  const [similarMovies, setSimilarMovie] = useState([])
  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [errMessage, setErrMessage] = useState('')
  const [total, setTotal] = useState("")
  const [cast, setCast] = useState([])
  const [crew, setCrew] = useState([])
  const [youtubelink, setYoutubeLink] = useState()
  let navigate = useNavigate()

  const poster = `http://image.tmdb.org/t/p/w1280${movie.poster_path}`
  const img = movie.poster_path ? poster : fakePoster
  const fakePosBig = ` linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.4)), url(${fakePoster})`
  const posterBig = ` linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.4)), url(http://image.tmdb.org/t/p/w1280${movie.poster_path})`
  const bigImg = movie.poster_path ? posterBig : fakePosBig
   const populateFunction = async() => {
    try{
      const movieRequest = await fetch(`${apiLink}movies/movie/${name}`, {
        method: "GET",
        })
      const movieRes = await movieRequest.json()
    if(movieRes.success){
      setMovie(movieRes.data)
      setErrMessage('')
      posterRef.current.focus()
      }else{
        navigate("/explore", { replace: true });
      }
  }catch(err){
    navigate("/explore", { replace: true });
  }
  }  
  const similarAPICall = async() => {
    try{
      const movieRequest = await fetch(`${apiLink}movies/similar/${name}`, {
        method: "GET",
        })
      const movieRes = await movieRequest.json()
      if(movieRes.success){
        setSimilarMovie(movieRes.data.results)
        setErrMessage('')
      }else{
        setErrMessage(movieRes.data)
      }
    }catch(err){
      setErrMessage('server error')
    }
  }
  const recommendedAPICall = async() => {
    try{
      const movieRequest = await fetch(`${apiLink}movies/recommended/${name}`, {
        method: "GET",
        })
      const movieRes = await movieRequest.json()
      console.log(movieRes)
      if(movieRes.success){
        setRecommendedMovies(movieRes.data.results)
        setErrMessage('')
      }else{
        setErrMessage(movieRes.data)
      }
    }catch(err){
      setErrMessage('server error')
    }
  }
  const getCastAndCrew = async() => {
    try{
      const movieRequest = await fetch(`${apiLink}movies/credits/${name}`, {
        method: "GET",
        })
      const movieRes = await movieRequest.json()
      if(movieRes.success){
        setCast(movieRes.data.cast)
        setCrew(movieRes.data.crew)
        setErrMessage('')
      }else{
        setErrMessage(movieRes.data)
      }
    }catch(err){
      setErrMessage('server error')
    }
  } 

  const getYoutubeLink = async() => {
    try{
      const movieRequest = await fetch(`${apiLink}movies/video/${name}`, {
        method: "GET",
        })
      const movieRes = await movieRequest.json()
      if(movieRes.success){
        const videos = movieRes.data.results
        for(const video of videos){
          if(video.name === "Official Trailer"){
            setYoutubeLink(video)
          }
        }
        }else{
        setErrMessage(movieRes.data)
      }
    }catch(err){
      setErrMessage('server error')
    }
  } 
  const runTime = () =>{
    let totalMinutes = parseInt(movie.runtime)
    const hours = Math.floor(totalMinutes / 60);          
    const mins = totalMinutes % 60;
    const newTime = `${hours} hr and ${mins} minutes`
    setTotal(newTime)
  }
    useEffect(() => {
      populateFunction()
      similarAPICall()
      getCastAndCrew()
      getYoutubeLink()
      recommendedAPICall()
    }, [name])

    useEffect(()=>{
      runTime()
    }, [movie])

    const verifyUser = () =>{
      const token = localStorage.getItem('token')
      if (!!token) {
        const user = jose.decodeJwt(token)
        if (!user) {
          localStorage.removeItem('token')
          navigate("/", { replace: true });
        } else {
          populateFunction()
        }
      }else{
        navigate("/", { replace: true });
      }
    }
    useEffect(() => {
      verifyUser()
    }, [])
return (
    <div className='movie-detail' >
      <header className='movie-nav'>
       <p  className='title-small'> {movie.title || movie.name} </p> 
      </header>
      <div className='poster-large-screens' style={{backgroundImage: bigImg}}></div>
      <img src={img}  className="movie-poster"/>
      <div className='movie-name'>
      <div className='other-btns'>
        <AddToPlayLists  addNewMovie={addNewMovie} movie={movie} allMyPlaylists={allMyPlaylists} ></AddToPlayLists> 
        <a id='forced'href={movie.homepage} target="_blank" ><button  ref={posterRef} className='btn-other'>Watch Movie?</button></a>
        {errMessage ? <p className='error-mesage'> {errMessage} </p> : null}
      </div>
      
      <p className='plot'>{movie.overview}</p>  
      </div>

            <PlotAndMore total={total} movie={movie} addNewMovie={addNewMovie} addToPlalist={addToPlalist} allMyPlaylists={allMyPlaylists} similarMovies={similarMovies} recommendedMovies={recommendedMovies}/>
            { cast.length > 0 && crew.length > 0 ? <CastAndCrew cast={cast} crew={crew}></CastAndCrew> : null}
            { youtubelink?.key ? <Trailer youtubelink={youtubelink} ></Trailer> : null }
    </div>
  )
}

export default MovieDescription