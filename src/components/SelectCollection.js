import React from 'react'
import Context from '../Context'
import RatingMovies from './RatingMovies'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NewCollection from './NewCollection';
library.add(faHeart)

class SelectCollection extends React.Component {
  state = { showingForm: false }
  render () {
    const { showingForm } = this.state
    return (
      <Context.Consumer>
        {
          ({ collections, addCollection, addMovieToCollection }) => 
            <>     
              <button className='button button__round' onClick={this.showForm}>
                Add to favMovies
              </button>
              { showingForm &&
                <>
                  <select value={this.state.value} onChange={addMovieToCollection}>
                    <option className='input input__favorite--inverse' value='0'>Elige una lista</option>
                      {
                        collections.map(collection =>
                          <option className='input input__favorite--inverse' value={collection.id} key={collection.id}>
                            {collection.title}
                          </option>
                        )
                      }
                  </select>
                  <input className='button button--primary' type='submit' value='Add' />
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
  handleSelect = async (event) => {
    await this.setState({ value: event.target.value })
    await this.props.onSelect(this.state.value, this.props.movie)
    console.log('valor de this.props.movie: ', this.props.movie)
    console.log('valor de this.state.value: ', this.state.value)
  }
}

export default SelectCollection