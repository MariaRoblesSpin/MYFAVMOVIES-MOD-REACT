import React from 'react'

import Nav from './components/Nav'
import Routes from './Routes'
import Context from './Context'

class MyMovies extends React.Component {
  state = {
    collections: JSON.parse(localStorage.getItem('collections')) || []
  }
  addCollection = collection => {
    collection.id = Date.now().valueOf()
    const previousState = this.state
    const newCollection= {
      id: collection.id,
      title: collection.title,
      description: collection.description,
      favMovies: []
    }
    let nextState = {}
    
    if (previousState.collections.length > 0) {
      nextState = {
        collections: [
          newCollection,
          ...previousState.collections
        ]
      }
      const alreadyCreated = previousState.collections.find(({ title }) => title == newCollection.title)
    
      if (!alreadyCreated) {
        this._setNewStateAndStorage(nextState)
        this.setState({ showingNew: false })
      }
    } else {
      nextState = {
        collections: [
          newCollection
        ]
      }
      this._setNewStateAndStorage(nextState)
      this.setState({ showingNew: false })
    }
  }
  
  deleteCollection = collection => {
    const previousState = this.state
    const nextState = {
      ...previousState, 
      collections: previousState.collections.filter(({title}) => title != collection.title )
    }
    this._setNewStateAndStorage(nextState)
  }
  addMovieToCollection = idCollectionObj => {
    const selectedCollection = idCollectionObj.value
    const newMovie = idCollectionObj.movie
    const previousState = this.state
    const newCollections = previousState.collections.map(collection => {
      if (collection.id == selectedCollection) {
        const favMovies = collection.favMovies
        const alreadyInCollection = favMovies.find(({ id }) => id === newMovie.id)
        if (!alreadyInCollection) {
          favMovies.unshift(newMovie)
        }
      }
      return collection
    })
    const nextState = {
      collections: [...newCollections]
    }
    this._setNewStateAndStorage(nextState)
  }
  deleteMovieFromCollection = idCollectionObj => {
    const selectedCollection = idCollectionObj.idCollection
    const currentMovie = idCollectionObj.movie
    const previousState = this.state
    const collectionsWithoutMovie = previousState.collections.map( collection => {
      if (collection.id == selectedCollection) {
        const newFavMovies = collection.favMovies.filter(({id}) => id != currentMovie.id)
        return Object.assign({}, collection, {
          favMovies: newFavMovies
        })
      }
      return collection  
    })
 
    const nextState = {
      collections: [...collectionsWithoutMovie]
    }
    this._setNewStateAndStorage(nextState)
  }
  ratingMovies = (movieObj) => {
    const currentRating = movieObj.rating
    const currentMovie = movieObj.movie
    const idCollection = movieObj.idCollection
    const previousState = this.state
    const collectionsWithMoviesWithRating = previousState.collections.map(collection => {
      if (collection.id == idCollection) {
        const favRatedMovies = collection.favMovies.map(favMovie => {
          if (favMovie.id == currentMovie.id) {
            return Object.assign({}, favMovie, {
              rating: currentRating
            })
          }
          return favMovie
        })
        return Object.assign({}, collection, {
          favMovies: favRatedMovies
        })
      }
      return collection 
    })
    const nextState = {
      collections: [...collectionsWithMoviesWithRating]
    }
    this._setNewStateAndStorage(nextState)
  }

  _setNewStateAndStorage = newContent => {
    this.setState(newContent)
    localStorage.setItem(
      'collections',
      JSON.stringify(newContent)
    )
  }
  
  render () {
    return (
      <Context.Provider value={{
        collections: this.state.collections,
        getMovies: this.getMovies,
        addCollection: this.addCollection,
        deleteCollection: this.deleteCollection,
        addMovieToCollection: this.addMovieToCollection,
        deleteMovieFromCollection: this.deleteMovieFromCollection,
        ratingMovies: this.ratingMovies
      }}> 
          <Nav/>
          <Routes/>
      </Context.Provider>
    )
  }
}

export default MyMovies