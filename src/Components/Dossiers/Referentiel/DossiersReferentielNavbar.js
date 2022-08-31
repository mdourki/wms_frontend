import React from 'react'
import '../../Sidebar.css'
import {Link} from 'react-router-dom'

export default function DossiersReferentielNavbar() {
  return (
    <div>
        <nav className='nav-menu active'>
            <ul className='nav-menu-items'>
                <li className='nav-item'>
                    <Link to='/dossiers/referentiel/depots' className='nav-links'>
                        Dépôts
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/referentiel/emplacements' className='nav-links'>
                        Emplacements
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/referentiel/familles' className='nav-links'>
                        Familles
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/referentiel/collections' className='nav-links'>
                        Collections
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/referentiel/styles' className='nav-links'>
                        Styles
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/referentiel/tailles' className='nav-links'>
                        Tailles
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/referentiel/couleurs' className='nav-links'>
                        Couleurs
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/referentiel/tva' className='nav-links'>
                        TVA
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers' className='nav-links'>
                        Quitter
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
