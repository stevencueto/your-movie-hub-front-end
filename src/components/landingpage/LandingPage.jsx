import React from 'react'
import { Link } from 'react-router-dom'
import './landingapge.css'
import Iphone from '../../Iphone'
function Home() {
  return (
    <section className='home-grid'>
      <Iphone/>
      <article className='lading-page'>
      <h1 className='welcome-heading'>
            Welcome
        </h1>
        <div className='btn-container'>
          <Link className="btn" to='/login'>Login</Link>
          <Link className="btn" to='/register'>Register</Link>

        </div>
      </article>
        



    </section>
  )
}

export default Home