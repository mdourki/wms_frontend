import React from 'react'
import '../Sidebar.css'
import {Link} from 'react-router-dom'

export default function ReportingNavbar() {
  return (
    <div>
        <nav className='nav-menu active'>
            <ul className='nav-menu-items'>
                <li className='nav-item'>
                    <Link to='/reporting/stockGlob' className='nav-links'>
                        Etat de stock global
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting/stockDepots' className='nav-links'>
                        Etat de stock par dépôts
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting/stockFamilles' className='nav-links'>
                        Etat de stock par familles
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting/stockFournisseurs' className='nav-links'>
                        Etat de stock par fournisseurs
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting/valorisationStock' className='nav-links'>
                        Valorisation des stocks
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting/referentiel' className='nav-links'>
                        Référentiel
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
