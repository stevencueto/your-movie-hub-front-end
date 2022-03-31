import React from 'react'

const PageButton = (props) => {
  return (
    <div className='btn-pages'>
        {props.pages.map((page)=>{
				return <button key={`${page}pagebtn`} className={`btn ${page} page`} onClick={()=> props.populateFunction(page)}>{page}</button>
			})}
    </div>
  )
}

export default PageButton