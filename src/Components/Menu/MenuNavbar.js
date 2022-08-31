import React from 'react'
import './MenuNavbar.css'
import {Link} from 'react-router-dom'

export default function MenuNavbar() {
  return (
    <div>
        <nav className='nav'>
            <Link to='/' className='nav-logo'>
                WMS
            </Link>
            <ul className='navbar-menu'>
                <li className='navbar-item'>
                    <Link to='/dossiers' className='navbar-links'>
                        Dossiers
                    </Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/transactions' className='navbar-links'>
                        Transactions
                    </Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/reporting' className='navbar-links'>
                        Reporting
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
