import React from 'react'

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