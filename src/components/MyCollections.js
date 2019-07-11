import React from 'react'
import CollectionContent from './CollectionContent'
class MyCollections extends React.Component {
  render () {
    return  (
      <ul className='collection'>
      {
        this.props.getInfo.map((collection) => (
          <li className='collection__item' key={collection.id}>
            <h3 className='collection__title'>{collection.title}</h3>
            <p className='collection__description'>{collection.description}</p>
            <CollectionContent idCollection={collection.id} />
          </li>
        ))
      }
    </ul>
    )
  }
}

export default MyCollections