const Information = (props)=> {
    const languages = props.movie.spoken_languages

  return (
    <div>
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
    </div>
  )
}

export default Information