import React from 'react'
import '../../Sidebar.css'
import {Link} from 'react-router-dom'

export default function InventairesNavbar() {
  return (
    <div>
        <nav className='nav-menu active'>
            <ul className='nav-menu-items'>
                <li className='nav-item'>
                    <Link to='/transactions/inventaires/ouverture' className='nav-links'>
                        Ouverture Inventaire
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='transactions/inventaires/integration' className='nav-links'>
                        Intégration Inventaire
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='transactions/inventaires/validation' className='nav-links'>
                        Validation Inventaire
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/transactions' className='nav-links'>
                        Quitter
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
