import './playlist.css'
import { useEffect, useState } from 'react'
import NewPlaylists from './NewPlaylists'
import AllMyPlayLists from './AllMyPlayLists'
const Playlists = (props)=> {
  const [playLists, setPlaylist]= useState(props.allMyPlaylists)
  const updatePlaylist = () => {
    setPlaylist(props.allMyPlaylists)
  }
  useEffect(()=>{
    updatePlaylist()
  },[props.allMyPlaylists])
  return (
    <div className='website-container'>
        <NewPlaylists newPlaylist={props.newPlaylist} handleNewPlaylist={props.handleNewPlaylist} newPlaylistReq={props.newPlaylistReq} errMessage={props.errMessage}></NewPlaylists>
        <AllMyPlayLists editPlayListRequest={props.editPlayListRequest}  allMyPlaylists={playLists} removeMovie={props.removeMovie} updatePlaylist={updatePlaylist}/>
    </div>
  )
}

export default Playlists