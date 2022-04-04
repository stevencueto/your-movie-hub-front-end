import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import apiLink from '../helpers'
import RecommendedMovies from "../movies/ShowMovies/RecommendedMovies"
export const OnePlaylist = ({name}) => {
    let navigate = useNavigate();
    const [playlist, setPlaylist] = useState({})
    const [movies, setMovies] = useState([])
    const [total, setTotal] = useState("")
    const [recommendedMovies, setRecommendedMovies] = useState([])
    const getPlaylists = async() =>{
        try{
            const request = await fetch(`${apiLink}playlist/find/${name}`, {
                method: 'GET',
                headers: {
                  'x-access-token': localStorage.getItem('token'),
                }
            })
            const response = await request.json()
            if(response.success){
                setPlaylist(response.data)
                setMovies(response.data.movie)
            }else{
                navigate("/explore", { replace: true });
            }
        }catch(err){
            navigate("/explore", { replace: true });
        }
    }
    const recommendedAPICall = async() => {
      if (movies.length === 0) return
      const movie = movies[Math.floor(Math.random()* movies.length)];
      try{
        const movieRequest = await fetch(`${apiLink}movies/recommended/${movie.id}`, {
          method: "GET",
          })
        const movieRes = await movieRequest.json()
        console.log(movieRes)
        if(movieRes.success){
          setRecommendedMovies(movieRes.data.results)
          console.log(recommendedMovies)
        }
      }catch(err){
      }
    }
    const runTime = () =>{
      let totalMinutes = 0
      for(const movie of movies){
        totalMinutes += parseInt(movie.runtime)
      }
      const hours = Math.floor(totalMinutes / 60);          
      const mins = totalMinutes % 60;
      const newTime = `${hours} hr and ${mins} minutes`
      setTotal(newTime)
      recommendedAPICall()
      }
    useEffect(()=>{
        getPlaylists()
    },[])
    useEffect(()=>{
        runTime()
    },[movies])
  return (
    <section className="playlist-one">
        <h1 className="text-playlist capitalize">{playlist.name}</h1>
        <p className="text-playlist playlist-description-other">{playlist.description}</p>
        <p className="text-playlist"> Length: {total}</p>
        {playlist?.user?.username ?<Link className="website-link text-playlist blocked" to="/"> by: {playlist.user.username}</Link> : null}
        <RecommendedMovies movies={movies}/>
        <h1 className="text-playlist">Recommended movies</h1>
        <RecommendedMovies movies={recommendedMovies}/>
    </section>
  )
}
