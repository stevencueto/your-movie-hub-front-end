import {useState} from 'react'

const AddToPlayLists = (props)=> {
    console.log(props, props)
    const [showAdd, setShowAdd] = useState(false)
    const playlist = props.allMyPlaylists;
    const [addToPlay, setAddToPlay] = useState("")
    const handleChange = (e) => {
        const {value} = e.target
        setAddToPlay(value)
        console.log(addToPlay, "s")
    }

  return (
    <div>
        <button className='btn' onClick={()=> setShowAdd(!showAdd)}> addToPlalist</button>
        {showAdd
        ?
        <form className ="add-to-playlist" onSubmit={(e) => {props.addNewMovie(props.movie, addToPlay); e.preventDefault()}}>
        
        <label htmlFor="palylistToAdd">Choose the playlist</label>
            <select id="palylistToAdd" name="palylistToAdd" required value={addToPlay} onChange={handleChange}>
                <option></option>
                {playlist.map((list)=>{
                    console.log(list)
                   return <option
                   key={list._id}
                   value={list._id}
                   >
                       {list.name}
                   </option>
                })
                }
            </select>  
            <button className='btn'>Submit</button>      
            </form>
            :
            null
        }
    </div>
  )
}
export default AddToPlayLists;