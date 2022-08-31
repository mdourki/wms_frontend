import React from 'react'
import '../../Sidebar.css'
import {Link} from 'react-router-dom'

export default function ReportingReferentielNavbar() {
  return (
    <div>
        <nav className='nav-menu active'>
            <ul className='nav-menu-items'>
                <li className='nav-item'>
                    <Link to='/reporting/referentiel/listPrdts' className='nav-links'>
                        Liste des produits
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting/referentiel/listPalettes' className='nav-links'>
                        Liste des palettes
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting/referentiel/listPrdtsParFam' className='nav-links'>
                        Liste des produits par familles
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting/referentiel/listPrdtsParFour' className='nav-links'>
                        Liste des produits par fournisseurs
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting/referentiel/listPrdtsParClt' className='nav-links'>
                        Liste des produits par clients
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting/referentiel/listEmplacements' className='nav-links'>
                        Liste des emplacements
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/reporting' className='nav-links'>
                        Quitter
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
