import React from 'react'
import Context from '../Context'

import NewCollection from './NewCollection'
import MovieRating from './MovieRating'
import './styles/RatingMovies.css'
import './styles/SelectCollection.css'
// var Rating = require('react-rating')



class SelectCollection extends React.Component {
  state = { showingForm: false, showingDelete: false, favorite: false, selectedCollection: '' }
  render () {
    const { showingForm, showingDelete, favorite } = this.state
    return (
      <Context.Consumer>
        {
          ({ collections, addCollection, ratingMovies, ratedMovie }) => 
            <div className='select-collection'> 

              <button className='select-collection__button' onClick={this.showForm}>
                Add to favMovies
              </button>
              { showingForm &&
                  <form className='select-collection__form' onSubmit={this._handleSubmit}>
                    <select className='select-collection__select' name='addToCollection' value={this.state.value} onChange={this._handleSelect}>
                      <option className='select-collection__option' value='0'>Chose a collection</option>
                        {
                          collections.map(collection =>
                            <option className='select-collection__option' value={collection.id} key={collection.id}>
                              {collection.title}
                            </option>
                          )
                        }
                    </select>
                    <button className='select-collection__button' type='submit'>Add</button>
                  </form>
                }
                {
                  favorite && 
                    <MovieRating 
                      movie={this.props.movie} 
                      idCollection={this.state.selectedCollection}
                      onRating={ratingMovies} 
                      rate={ratedMovie}
                    />      
                }
                {
                  showingDelete &&
                  <form className='select-collection__form' onSubmit={this._handleDelete}>
                    <label className='delete__label'>
                    Delete Movie from collection
                      <select className='delete__select' name='deleteFromCollection' value={this.state.value} onChange={this._handleDelete}>
                        <option className='delete__option' value='0'>Chose a collection</option>
                          {
                            collections.map(collection =>
                              <option className='delete__option' value={collection.id} key={collection.id}>
                                {collection.title}
                              </option>
                            )
                          }
                      </select>
                    </label>
                    <button className='delete__button' onClick={this.hideDelete}>Noooo!!!</button>
                    <button className='delete__button' type='submit' >Delete</button>
                  </form>
                }
                <NewCollection onSubmit={addCollection}/>
              </div>
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
  hideDelete = () => {
    this.setState({ showingDelete: false })
  }

  _handleSelect = (event) => {
    this.setState({ value: event.target.value })
  }
  _handleSubmit = (event) => {
    event.preventDefault()
    const { value } = this.state
    const movie = this.props.movie
    this.setState({ 
      showingDelete: true,
      showingForm: false,
      favorite: true,
      selectedCollection: value
    })
    this.props.onSelect({ value, movie })
  }
  _handleDelete = (event) => {
    event.preventDefault()
    const { value } = this.state
    const movie = this.props.movie
    this.props.onDelete({ value, movie })
  }
  
}

export default SelectCollection