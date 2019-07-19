import React from 'react'
import Context from '../Context'

import NewCollection from './NewCollection'
import MovieRating from './MovieRating'
import './styles/MovieRating.css'
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
                  <p className='select-collection__fav-movie'>This is a favMovie!!!</p>
                </>
                : 
                    collections.length === 0 
                    ? <p>You have to create a collection first!</p>
                    : <button className='select-collection__button' onClick={this.showForm}>
                        Add to favMovies
                      </button> 
              }
              { (showingForm && collections.length > 0) &&
                  <form className='select-collection__form' onSubmit={this._handleSubmit}>
                    <select className='select-collection__select' value={this.state.value} onChange={this._handleSelect}>
                      <option className='select-collection__option' value='0'>Chose a collection</option>
                        {
                          collections.map(collection =>
                            <option className='select-collection__option' data-name={collection.title} value={collection.id} key={collection.id}>
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
                    <div className='movie-rating'>
                    <MovieRating 
                      movie={this.props.movie} 
                      collections={collections}
                      idCollection={this.state.idCollection}
                      onRating={ratingMovies} 
                    />
                    </div>
                    <p>This movie belongs to "<strong>{this.state.nameCollection}</strong>" collection.</p>   
                    <form className='select-collection__form' onSubmit={this._handleSubmitDelete}>
                      <button className='delete__button' type='submit' >Delete from "{this.state.nameCollection}" collection</button>
                    </form>
                  </>   
                }

                {
                  favorite 
                  ? <span></span>
                  : <div className='create-collection'>
                    <button className='create-collection__button' onClick={this.showNew}>Create a collection!</button>
                    {
                      showingNew &&
                      <NewCollection onSubmit={addCollection} />
                    }
                    </div> 
                }
              </div>
          }
      </Context.Consumer>
    )
  }
  componentDidMount = async () => {
    if (this.props.collections.length > 0) {
      await this._getIdCollection(this.props.movie, this.props.collections)
      await this._getFavMovie(this.props.movie, this.state.idCollection, this.props.collections)
      await this._getNameCollection(this.props.movie, this.props.collections)
    }
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
    var index = event.target.selectedIndex;
    var optionElement = event.target.childNodes[index]
    var nameOption =  optionElement.getAttribute('data-name')
    this.setState({ value: event.target.value, nameCollection: nameOption })
  }
  _handleSubmit = (event) => {
    event.preventDefault()
    const { value } = this.state
    const movie = this.props.movie
    if (value != undefined) {
      this.setState({ 
        showingForm: false,
        favorite: true,
        idCollection: value
      })
      this.props.onSelect({ value, movie })
    }
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
  }
  _getFavMovie = ( currentMovie, idCollection, collections ) => {
    collections.map(collection => {
      if ( collection.id === idCollection) {
        const favMovies = collection.favMovies
        const favMovie = favMovies.find(({ id }) => id === currentMovie.id)
        if (favMovie) {
          this.setState({ favorite: true })
        } else {
          this.setState({ favorite: false })
        }
      }
    })
  }
  _getIdCollection = ( currentMovie, collections ) => {
    collections.map( collection => {
      if (collection.favMovies.find(({ id }) => id === currentMovie.id)) {
        this.setState({ idCollection: collection.id })
      } 
    })
  }
  _getNameCollection =  ( currentMovie, collections ) => {
    collections.map( collection => {
      if (collection.favMovies.find(({ id }) => id === currentMovie.id)) {
        this.setState({ nameCollection: collection.title})
      } 
    })
  }
}

export default SelectCollection