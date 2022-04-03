import {useState, useEffect} from 'react'
import SingleMovie from '../movies/SingleMovie'
import { Link } from 'react-router-dom'
import MoviesPlaylist from './MoviesPlaylist.jsx'
import EditPlayList from './EditPlayList'

const IndividualPlayLists = (props) => {
    const movies = props.playlist.movie
    const [show, setShow] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const handleShow = () =>{
      setShow(!show)
    }
    const [total, setTotal] = useState("") 
    const runTime = () =>{
      let totalMinutes = 0
      console.log(movies)
      for(const movie of movies){
        totalMinutes += parseInt(movie.runtime)
      }
      const hours = Math.floor(totalMinutes / 60);          
      const mins = totalMinutes % 60;
      const newTime = `${hours} hr and ${mins} minutes`
      setTotal(newTime)
      }

    useEffect(()=>{
      runTime()
    },[movies])
  return (
    <div className="playlist-info" key={`${props.playlist._id}9`}>
        {
        show 
        ?
        <EditPlayList playlist={props.playlist} editPlayListRequest={props.editPlayListRequest} handleShow={handleShow}></EditPlayList>
        :
        <>
        <h3> {props.playlist.name} <span className="edit" onClick={handleShow}>⚙️</span> <span className='edit' onClikc={()=> setShowDelete(!showDelete)}>🗑️ </span></h3>
        <p>{props.playlist.description}</p>
        <p>{total}</p>
         { movies.length > 0  ? <MoviesPlaylist key={`${props.playlist._id}99`} removeMovie={props.removeMovie} movies={movies}  playlistId={props.playlist._id}/> : <p>Add movies to playlists</p> }
         <Link className='website-link' to="/search">Add movies</Link>
         </>
      }

      
   </div>
  )
}

export default IndividualPlayLists