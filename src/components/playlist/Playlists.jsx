import React from 'react'
import NewPlaylists from './NewPlaylists'
const Playlists = (props)=> {
  return (
    <div>
        <NewPlaylists newPlaylist={props.newPlaylist} handleNewPlaylist={props.handleNewPlaylist} newPlaylistReq={props.newPlaylistReq} errMessage={props.errMessage}></NewPlaylists>
    </div>
  )
}

export default Playlists