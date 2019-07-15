import React from 'react'
import Context from '../Context'

import NewCollection from './NewCollection'
import MovieRating from './MovieRating'
import './styles/RatingMovies.css'
// var Rating = require('react-rating')



class SelectCollection extends React.Component {
  state = { showingForm: false, showingDelete: false, favorite: false, selectedCollection: '' }
  render () {
    const { showingForm, showingDelete, favorite } = this.state
    return (
      <Context.Consumer>
        {
          ({ collections, addCollection, ratingMovies, ratedMovie }) => 
            <>     
              <button className='button button__round' onClick={this.showForm}>
                Add to favMovies
              </button>
              { showingForm &&
                  <form onSubmit={this._handleSubmit}>
                    <label>
                      Chose a collection
                      <select name='addToCollection' value={this.state.value} onChange={this._handleSelect}>
                        <option className='input input__favorite--inverse' value='0'>Chose a collection</option>
                          {
                            collections.map(collection =>
                              <option className='input input__favorite--inverse' value={collection.id} key={collection.id}>
                                {collection.title}
                              </option>
                            )
                          }
                      </select>
                    </label>
                    <button className='button button--primary' type='submit' >Add</button>
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
                  <form onSubmit={this._handleDelete}>
                    <label>
                    Delete Movie from collection
                      <select name='deleteFromCollection' value={this.state.value} onChange={this._handleDelete}>
                        <option className='input input__favorite--inverse' value='0'>Chose a collection</option>
                          {
                            collections.map(collection =>
                              <option className='input input__favorite--inverse' value={collection.id} key={collection.id}>
                                {collection.title}
                              </option>
                            )
                          }
                      </select>
                    </label>
                    <button className='button button--primary' type='submit' >Delete</button>
                    <button onClick={this.hideForm}>Noooo!!!</button>
                  </form>
                }
                <NewCollection onSubmit={addCollection}/>
                
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
    this.setState({ 
      showingDelete: true,
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