import React from 'react'
import IndividualPlayLists from './IndividualPlayLists'

const AllMyPlayLists = (props)=> {
  return (
    <section>
        { props.allMyPlaylists ? props.allMyPlaylists.map((playlist)=>{
            return         <IndividualPlayLists key={`${playlist._id}contails`} playlist={playlist}></IndividualPlayLists>

        }) : <p>No Playlists</p>}
    </section>
  )
}

export default AllMyPlayLists