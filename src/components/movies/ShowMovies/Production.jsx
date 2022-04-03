
function Production(props) {
    const productionCompany = props.movie.production_companies
    const imgPath = `http://image.tmdb.org/t/p/w185`

  return (
    <div className="production"> 
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
 </div>
  )
}


export default Production
