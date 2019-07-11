import React from 'react'
import { NavLink } from 'react-router-dom'

import Search from './Search'
import './styles/Nav.css'

export default ()=>
  <nav className='navbar'>
    <ul className='menu'>
      <li className='menu__option'>
        <NavLink exact activeClassName='menu__link--active' className='menu__link' to='/'>NewMovies</NavLink>
      </li>
      <li className='menu__option'>
        <NavLink exact activeClassName='menu__link--active' className='menu__link' to='/myfavmovies'>MyFavMovies</NavLink>
      </li>
    </ul>
    <Search />
  </nav>

