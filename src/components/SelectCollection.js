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
          ({ collections, addCollection, ratingMovies }) => 
            <div className='select-collection'> 
              {/* {
                console.log('valor de la funcion getFavMovie: ', this.getFavMovie(this.props.movie, collections) )
             
              } */}
              {
                favorite
                ? <div>This is a favMovie!!!</div>
                : <button className='select-collection__button' onClick={this.showForm}>
                    Add to favMovies
                  </button> 
              }
              
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
                      collections={collections}
                      idCollection={this.state.selectedCollection}
                      onRating={ratingMovies} 
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
                {
                  favorite 
                  ? <span></span>
                  : <NewCollection onSubmit={addCollection}/> 
                }
                
              </div>
          }
      </Context.Consumer>
    )
  }
  componentDidMount = () => {
    this.getFavMovie(this.props.movie, this.props.collections)
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
  getFavMovie = ( currentMovie, collections ) => {
    collections.map(collection => {
      const favMovies = collection.favMovies
      const favMovie = favMovies.find(({ id }) => id === currentMovie.id)
      console.log('valor find de favMovie: ', favMovie) 
      if (favMovie) {
        this.setState({ favorite: true })
      } else {
        this.setState({ favorite: false })
      }
    })
  }
}

export default SelectCollection