import './playlist.css'
import NewPlaylists from './NewPlaylists'
import AllMyPlayLists from './AllMyPlayLists'
const Playlists = (props)=> {
  return (
    <div className='website-container'>
        <NewPlaylists newPlaylist={props.newPlaylist} handleNewPlaylist={props.handleNewPlaylist} newPlaylistReq={props.newPlaylistReq} errMessage={props.errMessage}></NewPlaylists>
        <AllMyPlayLists allMyPlaylists={props.allMyPlaylists}/>
    </div>
  )
}

export default Playlists