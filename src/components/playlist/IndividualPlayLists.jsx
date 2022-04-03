import {useEffect, useState} from 'react'
import SingleMovie from '../movies/SingleMovie'
import { Link } from 'react-router-dom'
import MoviesPlaylist from './MoviesPlaylist.jsx'
import EditPlayList from './EditPlayList'

const IndividualPlayLists = (props) => {
    const [movies, setMovies] = useState(props.playlist.movie)
    const [show, setShow] = useState(false)
    const handleShow = () =>{
      setShow(!show)
    }
    const updateMovies = ()=>{
      setMovies(props.playlist.movie)
    }
    useEffect(()=>
    {
      updateMovies()
    },[props.playlist])
  return (
    <div className="playlist-info" key={`${props.playlist._id}9`}>
        {
        show 
        ?
        <EditPlayList playlist={props.playlist} editPlayListRequest={props.editPlayListRequest} handleShow={handleShow}></EditPlayList>
        :
        <>
        <h3> {props.playlist.name} <span className="edit" onClick={handleShow}>⚙️</span> <span className='edit'>🗑️ </span></h3>
        <p>{props.playlist.description}</p>
         { movies.length > 0  ? <MoviesPlaylist key={`${props.playlist._id}99`} removeMovie={props.removeMovie} movies={movies}  playlistId={props.playlist._id}/> : <p>Add movies to playlists</p> }
         <Link className='website-link' to="/search">Add movies</Link>
         </>
      }

      
   </div>
  )
}

export default IndividualPlayLists