import React from 'react'
import IndividualPlayLists from './IndividualPlayLists'

const AllMyPlayLists = (props)=> {
  return (
    <section  className="playlist-grid" key="playlist-grid">
        { props.allMyPlaylists ? props.allMyPlaylists.map((playlist)=>{
            return  <IndividualPlayLists editPlayListRequest={props.editPlayListRequest} deletePlayListRequest={props.deletePlayListRequest}  key={`${playlist._id}contails`} playlist={playlist} removeMovie={props.removeMovie} />

        }) : <p>No Playlists</p>}
    </section>
  )
}

export default AllMyPlayLists