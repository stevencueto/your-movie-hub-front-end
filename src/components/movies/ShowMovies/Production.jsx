
function Production(props) {
    const productionCompany = props.movie.production_companies
    const productionCountries = props.movie.production_countries

    const imgPath = `http://image.tmdb.org/t/p/w185`

  return (
    <div className="production taller"> 
        { 
        productionCompany 
        ?
        <>
        <h3 className='plot-subheading'>Production {productionCompany.length > 1 ? "companies" : "company"}</h3>
        <ul className='ul-plot'>
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
         { 
        productionCountries
        ?
        <>
        <h3 className='plot-subheading'>Production {productionCompany.length > 1 ? "countries" : "country"}</h3>
        <ul className='ul-plot'>
            { productionCountries.map((country)=>{
                return <li key={country.iso_3166_1}>
                            {country.name}
                        </li>
            })} 
        </ul>
         </>
         :
         null
         }
 </div>
  )
}


export default Production
