import React from 'react'
import './styles/Showcase.css'
const Showcase = props =>
  <ul className='showcase'>
    {
      props.elements.map(element =>
        <li className='showcase__option' key={props.keyFn(element)}>
          {props.render(element)}
        </li>
      )
    }
  </ul>

export default Showcase