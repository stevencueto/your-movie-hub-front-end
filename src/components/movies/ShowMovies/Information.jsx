const Information = (props)=> {
    const languages = props.movie.spoken_languages
    const genres = props.movie.genres
  return (
    <div>
        { 
        languages 
        ?
        <>
        <h3 className='plot-subheading'> { languages.length > 0 ? "Languages" : "Language"}</h3>
        <ul className='ul-plot'>
            { languages.map((language)=>{
                return <li key={language.name}>{language.english_name}</li>
            })} 
        </ul>
        </>
         :
         null
         }

      { 
        genres
        ?
        <>
        <h3 className='plot-subheading'>Genre</h3>
        <ul className='ul-plot'>
            { genres.map((genre)=>{
                return <li key={genre.name}>{genre.name}</li>
            })} 
        </ul>
        </>
         :
         null
         }
    </div>
  )
}

export default Information