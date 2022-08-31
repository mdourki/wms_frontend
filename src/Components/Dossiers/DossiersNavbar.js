import React from 'react'
import '../Sidebar.css'
import {Link} from 'react-router-dom'

export default function DossiersNavbar() {
  return (
    <div>
        <nav className='nav-menu active'>
            <ul className='nav-menu-items'>
                <li className='nav-item'>
                    <Link to='/dossiers/fournisseurs' className='nav-links'>
                        Fournisseurs
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/clients' className='nav-links'>
                        Clients
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/referentiel' className='nav-links'>
                        Référentiel
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/categories' className='nav-links'>
                        Catégories
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
