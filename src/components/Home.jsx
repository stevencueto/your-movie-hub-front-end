import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div>
        <h1>
            Welcome
        </h1>
        <Link to="/register">register</Link> <br /><br />
        <Link to="/login">Login</Link><br /><br />
        <Link to="/dashboard">Favorite Movies</Link>
<br /><br /><br /><br />



        <Link to='/' onClick={() => {localStorage.removeItem('token')}}>LogOut</Link><br /><br /><br />

    </div>
  )
}

export default Home