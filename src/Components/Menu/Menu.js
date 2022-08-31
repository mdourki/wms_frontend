import React from 'react'
import MenuNavbar from './MenuNavbar'
import '../../App.css'
import warehouse from '../../Images/warehouse.jpg'

export default function Menu() {
  return (
    <div className='menu'>
        <MenuNavbar/>
        {/*<img src={warehouse} className='background' alt='warehouse'/>*/}
    </div>
  )
}
