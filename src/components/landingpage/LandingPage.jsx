import React, {useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import './landingapge.css'
import Iphone from '../../Iphone'


function Home() {
	let navigate = useNavigate();
  useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) navigate("/trending", { replace: true });
	}, [])
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