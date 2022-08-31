import React from 'react'
import '../Sidebar.css'
import {Link} from 'react-router-dom'

export default function TransactionsNavbar() {
  return (
    <div>
        <nav className='nav-menu active'>
            <ul className='nav-menu-items'>
                <li className='nav-item'>
                    <Link to='/transactions/mvFour' className='nav-links'>
                        Mouvement Fournisseur
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/transactions/mvClt' className='nav-links'>
                        Mouvement Client
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/transactions/inventaires' className='nav-links'>
                        Inventaires
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/' className='nav-links'>
                        Quitter
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
