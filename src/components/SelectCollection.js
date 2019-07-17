import React from 'react'
import Context from '../Context'

import NewCollection from './NewCollection'
import MovieRating from './MovieRating'
import './styles/RatingMovies.css'
import './styles/SelectCollection.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faHeart)


class SelectCollection extends React.Component {
  state = { showingForm: false, showingDelete: false, showingNew: false, favorite: false, idCollection: '' }
  render () {
    const { showingForm, showingNew, favorite } = this.state
    return (
      <Context.Consumer>
        {
          ({ collections, addCollection, ratingMovies }) => 
            <div className='select-collection'> 
              {
                favorite
                ? 
                <>
                  <FontAwesomeIcon icon='heart' />
                  <div>This is a favMovie!!!</div>
                </>
                : 
                    collections.length === 0 
                    ? <span>You have to create a collection first!</span>
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
                    <>
                    <MovieRating 
                      movie={this.props.movie} 
                      collections={collections}
                      idCollection={this.state.idCollection}
                      onRating={ratingMovies} 
                    />
                    <p>This movie belongs to <strong>{this.state.idCollection}</strong> collection.</p>   
                    <form className='select-collection__form' onSubmit={this._handleSubmitDelete}>
                      <button className='delete__button' type='submit' >Delete from {this.state.idCollection} collection</button>
                    </form>
                  </>   
                }

                {
                  favorite 
                  ? <span></span>
                  : <>
                    <button className='my-fav-movies__button' onClick={this.showNew}>Create a collection!</button>
                    {
                      showingNew &&
                      <NewCollection onSubmit={addCollection} />
                    }
                    </> 
                }
                
              </div>
          }
      </Context.Consumer>
    )
  }
  componentDidMount = async () => {
    await this.getIdCollection(this.props.movie, this.props.collections)
    await this.getFavMovie(this.props.movie, this.state.idCollection, this.props.collections)
  }
  showForm = () => {
    this.setState({ showingForm: true })
  }
  showNew = () => {
    this.setState({ showingNew: true })
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
      showingForm: false,
      favorite: true,
      idCollection: value
    })
    this.props.onSelect({ value, movie })
  }
  _handleSubmitDelete = (event) => {
    event.preventDefault()
    const idCollection = this.state.idCollection
    const movie = this.props.movie
    this.props.onDelete({ idCollection, movie })
    this.setState({ 
      favorite: false, 
      showingDelete:false
     })
    console.log('valor de la idCollection en el state: ', idCollection)
  }
  getFavMovie = ( currentMovie, idCollection, collections ) => {
    collections.map(collection => {
      if ( collection.id === idCollection) {
        const favMovies = collection.favMovies
        const favMovie = favMovies.find(({ id }) => id === currentMovie.id)
        console.log('valor find de favMovie en getFavMovie: ', favMovie) 
        if (favMovie) {
          this.setState({ favorite: true })
        } else {
          this.setState({ favorite: false })
        }
      }
    })
  }
  getIdCollection = ( currentMovie, collections ) => {
    collections.map( collection => {
      if (collection.favMovies.find(({ id }) => id === currentMovie.id)) {
        console.log('valor de idCollection: ', collection.id)
        this.setState({ idCollection: collection.id })
      } 
    })
  }
}

export default SelectCollection