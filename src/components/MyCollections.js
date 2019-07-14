import React from 'react'
import Context from '../Context'
import { Link } from 'react-router-dom'
import CollectionContent from './CollectionContent'
class MyCollections extends React.Component {
  state = { showingForm: false}
  render () { 
    const { showingForm } = this.state
    return  (
      <Context.Consumer>
        {
          ({ collections }) => 
            <ul className='collection'>
              {
                collections.map((collection) => (
                  <li className='collection__item' key={collection.id}>
                    <h3 className='collection__title'>{collection.title}</h3>
                    <p className='collection__description'>{collection.description}</p>
                    <button onClick={this.showForm}>Delete Collection</button>
                    {
                      showingForm &&
                        <div className='message'>
                          <p> You are going to delete the "{collection.title}" collection. Are you sure?</p>
                          <button onClick= {(event) => {
                              event.preventDefault() 
                              this.props.onDelete(collection)
                            }
                          }>Ou yeah!!!</button>
                          <button onClick={this.hideForm}>Noooo!!!</button>
                        </div>
                    }
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
        }
      </Context.Consumer>
      
    )
  }
  showForm = () => {
    this.setState({showingForm: true, delete: true})
  }
  hideForm = () => {
    this.setState({showingForm: false})
  }
 }

export default MyCollections