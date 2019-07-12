import React from 'react'
import Context from '../Context'
import RatingMovies from './RatingMovies'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NewCollection from './NewCollection';
library.add(faHeart)

class SelectCollection extends React.Component {
  state = { showingForm: false, value:'' }
  render () {
    const { showingForm } = this.state
    return (
      <Context.Consumer>
        {
          ({ collections, addCollection }) => 
            <>     
              <button className='button button__round' onClick={this.showForm}>
                Add to favMovies
              </button>
              { showingForm &&
                <>
                  <form onSubmit={this._handleSubmit}>
                    <label>
                      Chose a collection
                  <select value={this.state.value} onChange={this._handleSelect}>
                    <option className='input input__favorite--inverse' value='0'>Elige una lista</option>
                      {
                        collections.map(collection =>
                          <option className='input input__favorite--inverse' value={collection.id} key={collection.id}>
                            {
                              console.log('valor de collection.id en el option: ', collection.id)
                            }
                            {collection.title}
                          </option>
                        )
                      }
                  </select>
                  
                  </label>
                  <button className='button button--primary' type='submit' >Add</button>
                  </form>
                  
                  <NewCollection onSubmit={addCollection}/>
                  <RatingMovies />
                  <FontAwesomeIcon icon='heart'  />
                </>
              }
            </>
          }
        
      </Context.Consumer>
    )
  }
  showForm = () => {
    this.setState({ showingForm: true })
  }
  hideForm = () => {
    this.setState({ showingForm: false })
  }

  _handleSelect = (event) => {
    this.setState({ value: event.target.value })
  }
  _handleSubmit = (event) => {
    event.preventDefault()
    const { value } = this.state
    const movie = this.props.movie
    console.log('valor de value en handleSubmit: ', value)
    this.props.onSelect({ value, movie })
  }
}

export default SelectCollection