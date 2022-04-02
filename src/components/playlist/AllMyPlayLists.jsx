import React from 'react'
import IndividualPlayLists from './IndividualPlayLists'

const AllMyPlayLists = (props)=> {
  return (
    <section  classname="playlist-grid" key="playlist-grid">
        { props.allMyPlaylists ? props.allMyPlaylists.map((playlist)=>{
            return         <IndividualPlayLists editPlayListRequest={props.editPlayListRequest}  key={`${playlist._id}contails`} playlist={playlist} removeMovie={props.removeMovie}></IndividualPlayLists>

        }) : <p>No Playlists</p>}
    </section>
  )
}

export default AllMyPlayLists