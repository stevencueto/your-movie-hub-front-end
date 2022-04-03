import {useState, useEffect} from 'react'
import  fakePoster from '../../../images/not-movie-pic.jpeg'
import PlotAndMore from './PlotAndMore'
import AddToPlayLists from './AddToPlayLists'
import apiLink from '../../helpers'
import './moviedescription.css'
import CastAndCrew from './CastAndCrew'
function MovieDescription({name, addNewMovie, allMyPlaylists, addToPlalist}) {
  const [movie, setMovie] = useState([])
  const [similarMovies, setSimilarMovie] = useState([])
  const [errMessage, setErrMessage] = useState('')
  const [total, setTotal] = useState("")
  const [cast, setCast] = useState([])
  const [crew, setCrew] = useState([])

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
      }else{
        setErrMessage(movieRes.data)
      }
  }catch(err){
    setErrMessage('server error')
  }
  }  
  const similarAPICall = async() => {
    console.log('api')
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
  const getCastAndCrew = async() => {
    try{
      const movieRequest = await fetch(`${apiLink}movies/credits/${name}`, {
        method: "GET",
        })
      const movieRes = await movieRequest.json()
      if(movieRes.success){
        setCast(movieRes.data.cast)
        setCrew(movieRes.data.crew)
        console.log(movieRes.data.cast,movieRes.data.crew, 'cast')
        setErrMessage('')
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
    }, [name])

    useEffect(()=>{
      runTime()
    }, [movie])
return (
    <div className='movie-detail' >
      <header className='movie-nav'>
       <p className='title-small'> {movie.title || movie.name} </p> 
      </header>
      <div className='poster-large-screens' style={{backgroundImage: bigImg}}></div>
      <img src={img} className="movie-poster"/>
      <div className='movie-name'>
      <div className='other-btns'>
        <AddToPlayLists addNewMovie={addNewMovie} movie={movie} allMyPlaylists={allMyPlaylists} ></AddToPlayLists> 
        <a id='forced'href={movie.homepage} target="_blank" ><button className='btn-other'>Watch Movie?</button></a>
        {errMessage ? <p className='error-mesage'> {errMessage} </p> : null}
      </div>
      
      <p className='plot'>{movie.overview}</p>  
      </div>

            <PlotAndMore total={total} movie={movie} addNewMovie={addNewMovie} addToPlalist={addToPlalist} allMyPlaylists={allMyPlaylists} similarMovies={similarMovies}/>
            { cast.length > 0 && crew.length > 0 ? <CastAndCrew cast={cast} crew={crew}></CastAndCrew> : null}
    </div>
  )
}

export default MovieDescription