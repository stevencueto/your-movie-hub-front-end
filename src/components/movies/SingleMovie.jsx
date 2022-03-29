import React from 'react'
import EditSingleMovie from './ShowMovies/EditSingleMovie'
import { Route, Routes, Link } from 'react-router-dom'

const SingleMovie = (props) => {
    console.log(props.movie.title, "1221")
  return (
    <div key={props.movie._id}>
        <p>{props.movie.title}</p>
        <img src={props.movie.image} alt="" />
        <Routes path={`/movie/${props.movie._id}/`}>
          <Route path={`/edit`} element={<EditSingleMovie key={props.movie.id + "editThis"} movie={props.movie} editFavoriteMovies={props.editFavoriteMovies} />}/>
        </Routes>
      <Link to={`/movie/${props.movie._id}/edit`}> Edit {props.movie.title} ?</Link>
    </div>
  )
}

export default SingleMovie