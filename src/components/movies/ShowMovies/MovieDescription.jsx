import {useState, useEffect} from 'react'
import  fakePoster from '../../../images/not-movie-pic.jpeg'
import PlotAndMore from './PlotAndMore'
import AddToPlayLists from './AddToPlayLists'
import './moviedescription.css'
function MovieDescription({name, addNewMovie, allMyPlaylists, addToPlalist}) {
  const [movie, setMovie] = useState([])
  const [similarMovies, setSimilarMovie] = useState([])
  const [errMessage, setErrMessage] = useState('')
  const [total, setTotal] = useState("") 
  
  const poster = `http://image.tmdb.org/t/p/w1280${movie.poster_path}`
  const img = movie.poster_path ? poster : fakePoster
  const fakePosBig = ` linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.4)), url(${fakePoster})`
  const posterBig = ` linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.4)), url(http://image.tmdb.org/t/p/w1280${movie.poster_path})`
  const bigImg = movie.poster_path ? posterBig : fakePosBig
   const populateFunction = async() => {
    try{
      const movieRequest = await fetch(`https://yourmoviehubapi.herokuapp.com/movies/movie/${name}`, {
        method: "GET",
        })
      const movieRes = await movieRequest.json()
    if(movieRes.success){
      setMovie(movieRes.data)
      console.log(movieRes.data)
      }else{
        setErrMessage(movieRes.data)
      }
  }catch(err){
    console.error(err)
  }
  }  
  const similarAPICall = async() => {
    console.log('api')
    try{
      const movieRequest = await fetch(`https://yourmoviehubapi.herokuapp.com/movies/similar/${name}`, {
        method: "GET",
        })
      const movieRes = await movieRequest.json()
      if(movieRes.success){
        console.log(movieRes.data, 'datas')
        setSimilarMovie(movieRes.data.results)
      }
      console.log(movieRes.data)
    }catch(err){
    console.error(err)
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
      </div>
      
      <p className='plot'>{movie.overview}</p>  
      </div>

      			{errMessage ? <p className='error-mesage'> {errMessage} </p> : null}
            <PlotAndMore total={total} movie={movie} addNewMovie={addNewMovie} addToPlalist={addToPlalist} allMyPlaylists={allMyPlaylists} similarMovies={similarMovies}/>
    </div>
  )
}

export default MovieDescription