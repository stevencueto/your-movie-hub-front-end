import {useState, useEffect} from 'react'
import  fakePoster from '../../../images/not-movie-pic.jpeg'
import './moviedescription.css'


function MovieDescription({name}) {
  const [movie, setMovie] = useState([])
  const [errMessage, setErrMessage] = useState([])
  const imgPath = `http://image.tmdb.org/t/p/w1280${movie.poster_path}`
  const img = !!movie.poster_path ? imgPath : fakePoster

  const populateFunction = async() => {
    try{
      const movieRequest = await fetch(`https://yourmoviehubapi.herokuapp.com/movies/movie/${name}`, {
        method: "GET",
        })
      const movieRes = await movieRequest.json()
    if(movieRes.success){
      setMovie(movieRes.data)
      console.log(movieRes)
      }else{
        setErrMessage(movieRes.data)
      }
  }catch(err){
    console.error(err)
  }
}  
useEffect(() => {
  populateFunction()
}, [])

return (
    <div className='movie-detail'>
			{errMessage && <p className='error-mesage'> {errMessage} </p>}
      <header className='movie-header' style={{backgroundImage: `url(${img})`}}>
      </header>
      <div className='float-page'>
        <h1 className='movie-name'>{movie.name || movie.title }</h1>
        <div className='modal-body'>
      </div>
        {/* <h2>{JSON.stringify(movie)}</h2> */}
      </div>
    </div>
  )
}

export default MovieDescription