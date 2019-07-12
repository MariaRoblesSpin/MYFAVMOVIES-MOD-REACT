import React from 'react'
import { Link } from 'react-router-dom'
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
            
            {
              collection.favMovies.length > 0
                ? <CollectionContent favMovies={collection.favMovies} />
                : 
                  <div className='message'>
                  <p>Select some movies for your collection</p>
                  <button> 
                    <Link to='./'>
                      Go to movies!
                    </Link> 
                  </button>
                  </div>
            }
            
          </li>
        ))
      }
    </ul>
    )
  }
}

export default MyCollections