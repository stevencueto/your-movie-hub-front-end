import './playlist.css'
import NewPlaylists from './NewPlaylists'
import AllMyPlayLists from './AllMyPlayLists'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as jose from 'jose'

const Playlists = (props)=> {
  const [makeBigger, setMakeBigger] = useState('')
  let navigate = useNavigate()

  const bigger = () =>{
    return makeBigger === "" ? "largerscreen" : ""
  }
  const verifyUser = () =>{
    const token = localStorage.getItem('token')
    if (!!token) {
      const user = jose.decodeJwt(token)
      if (!user) {
        localStorage.removeItem('token')
        navigate("/", { replace: true });
      }
    }else{
      navigate("/", { replace: true });
    }
  }
  useEffect(() => {
    verifyUser()
  },[])
  return (
    <div className={`website-container playlists-cont ${makeBigger}`}>
      {props.errMessage ? <p className='error-message'>{props.errMessage}</p> : null}
        <NewPlaylists newPlaylist={props.newPlaylist} handleNewPlaylist={props.handleNewPlaylist} newPlaylistReq={props.newPlaylistReq} bigger={bigger}></NewPlaylists>
        <AllMyPlayLists editPlayListRequest={props.editPlayListRequest}  allMyPlaylists={props.allMyPlaylists} removeMovie={props.removeMovie} deletePlayListRequest={props.deletePlayListRequest}/>
    </div>
  )
}

export default Playlists