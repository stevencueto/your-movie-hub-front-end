import './playlist.css'
import NewPlaylists from './NewPlaylists'
import AllMyPlayLists from './AllMyPlayLists'
const Playlists = (props)=> {
  return (
    <div className='website-container'>
        <NewPlaylists newPlaylist={props.newPlaylist} handleNewPlaylist={props.handleNewPlaylist} newPlaylistReq={props.newPlaylistReq} errMessage={props.errMessage}></NewPlaylists>
        <AllMyPlayLists editPlayListRequest={props.editPlayListRequest}  allMyPlaylists={props.allMyPlaylists} removeMovie={props.removeMovie}/>
    </div>
  )
}

export default Playlists