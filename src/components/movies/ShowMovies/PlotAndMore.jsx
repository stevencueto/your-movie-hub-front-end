import './moviedescription.css'
import {Link} from "react-router-dom"
import { useState } from 'react'
const PlotAndMore = (props)=> {
    const imbd = `https://www.imdb.com/title/${props.movie.imdb_id}`
    const languages = props.movie.spoken_languages
    const productionCompany = props.movie.production_companies
    const imgPath = `http://image.tmdb.org/t/p/w185`
    const [showAdd, setShowAdd] = useState(false)
    const playlist = props.allMyPlaylists;
    const [addToPlay, setAddToPlay] = useState("")
    console.log(playlist)
    const handleChange = (e) => {
        const {value} = e.target
        setAddToPlay(value)
        console.log(addToPlay, "s")
    }
  return (
    <div className='movie-plo'>
        { 
        languages 
        ?
        <>
        <h3 className='plot-subheading'>Language</h3>
        <ul className='ull-plot'>
            { languages.map((language)=>{
                return <li key={language.name}>{language.english_name}</li>
            })} 
        </ul>
        </>
         :
         null
         }
         { 
        productionCompany 
        ?
        <>
        <h3 className='plot-subheading'>Production {productionCompany.length > 1 ? "companies" : "company"}</h3>

        <ul className='ull-plot'>
            { productionCompany.map((company)=>{
                return <li key={company.name}>
                    {company.name} <br />
                    {company.origin_country} <br />
                    {company.logo_path ? <img src={`${imgPath}${company.logo_path}`} alt="" /> : null}
                </li>
            })} 
        </ul>
         </>
         :
         null
         }
        <p>Budget{props.movie.budget}</p>
        <p>Status: {props.movie.status}</p>
        <p> Rating: {props.movie.rating}</p>
        <p> Vote Average: {props.movie.vote_average}</p>
        <p>Release Date {props.movie.release_date}</p>
        <p>revenue {props.movie.revenue}</p>
        <p> Runtime: {props.movie.runtime} mins</p>
        <button className='btn' onClick={()=> setShowAdd(!showAdd)}> addToPlalist</button>
        {showAdd
            ?
            <form onSubmit={(e) => {props.addNewMovie(props.movie, addToPlay); e.preventDefault()}}>
            
            <label htmlFor="palylistToAdd">Add to Plalists?</label>
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
                <button className='btn'> Add to Playlists?</button>      
                </form>
                :
                null
        }
        
        <Link className='btn' to={{ pathname: props.homepage }} target="_blank" >Watch Movie?</Link>
    </div>
  )
}

export default PlotAndMore