import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
const Footer = () =>  {
  return (
    <footer>
        <ul className="ul-footer">
            <li className='li-footer'><a href="https://github.com/stevencueto" target="_blank" className='footer-links'>Github</a> </li>
            <li className='li-footer'><a href="https://www.linkedin.com/in/stevencueto/" target="_blank" className='footer-links'>LinkedIn</a> </li>
            <li className='li-footer'><a href='https://www.stevencueto.com/' target="_blank" className='footer-links'>stevencueto.com</a> </li>
            <li className='li-footer'><Link to='/' className='footer-links'>2022 Your Movie Hub ©</Link> </li>
        </ul>
    </footer>
  )
}

export default Footer