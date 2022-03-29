import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
const Footer = () =>  {
  return (
    <footer>
        <ul className="ul-footer">
            <li className='li-footer'><Link to='/' className='footer-links'>About</Link> </li>
            <li className='li-footer'><Link to='/' className='footer-links'>About</Link> </li>
            <li className='li-footer'><Link to='/' className='footer-links'>About</Link> </li>
            <li className='li-footer'><Link to='/' className='footer-links'>About</Link> </li>
        </ul>
    </footer>
  )
}

export default Footer