import {useState} from 'react'

const AddToPlayLists = (props)=> {
    const [showAdd, setShowAdd] = useState(false)
    const playlist = props.allMyPlaylists;
    const [addToPlay, setAddToPlay] = useState("")
    const handleChange = (e) => {
        const {value} = e.target
        setAddToPlay(value)
    }

  return (
    <div>
        <button className='btn-other' onClick={()=> setShowAdd(!showAdd)}> Add to Playlist?</button>
        {showAdd
        ?
        <form className ="add-to-playlist" onSubmit={(e) => {props.addNewMovie(props.movie, addToPlay); e.preventDefault()}}>
        
        <label htmlFor="palylistToAdd" className='choose'>Choose playlist</label>
            <select id="palylistToAdd" name="palylistToAdd" required value={addToPlay} onChange={handleChange}>
                <option></option>
                {playlist.map((list)=>{
                   return <option
                   key={list._id}
                   value={list._id}
                   >
                       {list.name}
                   </option>
                })
                }
            </select>  
            <button className='btn-other'>Submit</button>      
            </form>
            :
            null
        }
    </div>
  )
}
export default AddToPlayLists;