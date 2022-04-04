import './playlist.css'
import NewPlaylists from './NewPlaylists'
import AllMyPlayLists from './AllMyPlayLists'
import { useState } from 'react'
const Playlists = (props)=> {
  const [makeBigger, setMakeBigger] = useState('')
  const bigger = () =>{
    return makeBigger === "" ? "largerscreen" : ""
  }
  return (
    <div className={`website-container playlists-cont ${makeBigger}`}>
      {props.errMessage ? <p className='error-message'>{props.errMessage}</p> : null}
        <NewPlaylists newPlaylist={props.newPlaylist} handleNewPlaylist={props.handleNewPlaylist} newPlaylistReq={props.newPlaylistReq} bigger={bigger}></NewPlaylists>
        <AllMyPlayLists editPlayListRequest={props.editPlayListRequest}  allMyPlaylists={props.allMyPlaylists} removeMovie={props.removeMovie} deletePlayListRequest={props.deletePlayListRequest}/>
    </div>
  )
}

export default Playlists