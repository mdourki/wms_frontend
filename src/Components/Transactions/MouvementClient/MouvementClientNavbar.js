import React from 'react'
import '../../Sidebar.css'
import {Link} from 'react-router-dom'

export default function MouvementClientNavbar() {
  return (
    <div>
        <nav className='nav-menu active'>
            <ul className='nav-menu-items'>
                <li className='nav-item'>
                    <Link to='/transactions/mvClt/commande' className='nav-links'>
                        Commande
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/transactions/mvClt/livraison' className='nav-links'>
                        Livraison
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/transactions/mvClt/facturation' className='nav-links'>
                        Facturation
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
