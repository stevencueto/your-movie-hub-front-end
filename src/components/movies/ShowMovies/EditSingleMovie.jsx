import React, {useState} from 'react'
import { Outlet } from 'react-router-dom' 

const EditSingleMovie = (props) => {
    console.log(props.movie)
    const [editMovie, setEditMovie] = useState({
		title: props.movie.title,
		releaseDate: props.movie.releaseDate,
		summary: props.movie.summary,
		image: props.movie.image
	})
    const handleFormEdit = (e) =>{
        const {name, value, type, checked} = e.target
        setEditMovie((prev) =>{
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
  return (
        <form key={'edit-single-movie-form'} onSubmit={props.editFavoriteMovies}>
            <Outlet/>
        <input
            type="text"
            placeholder="Movie Title"
            value={editMovie.title}
            name="title"
            onChange={handleFormEdit}
            required
        />
        <input
            type="text"
            placeholder="Release Date"
            value={editMovie.releaseDate}
            name="releaseDate"
            onChange={handleFormEdit}
            required
        />
        <textarea 
            value={editMovie.summary}
            placeholder="Summary"
            onChange={handleFormEdit}
            name="summary"
            required
        />
        <input
            type="text"
            placeholder="Image"
            value={editMovie.image}
            name="image"
            onChange={handleFormEdit}
            required
        />
        <button type="submit">Edit</button>
    </form>
  )
}

export default EditSingleMovie