import React from 'react'
import '../../Sidebar.css'
import {Link} from 'react-router-dom'

export default function DossiersCategoriesNavbar() {
  return (
    <div>
        <nav className='nav-menu active'>
            <ul className='nav-menu-items'>
                <li className='nav-item'>
                    <Link to='/dossiers/categories/categoriesClts' className='nav-links'>
                        Catégories Clients
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dossiers/categories/categoriesFour' className='nav-links'>
                        Catégories Fournisseurs
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
