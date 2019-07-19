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
        this.setState(nextState)
        this.setState({ showingNew: false })
        localStorage.setItem(
          'collections',
          JSON.stringify(nextState)
        )
      }
    } else {
      nextState = {
        collections: [
          newCollection
        ]
      }
      this.setState(nextState)
        this.setState({ showingNew: false })
        localStorage.setItem(
          'collections',
          JSON.stringify(nextState)
        )
    }
  }
  
  deleteCollection = collection => {
    const previousState = this.state
    const nextState = {
      ...previousState, 
      collections: previousState.collections.filter(({title}) => title != collection.title )
    }
    this.setState(nextState)
    localStorage.setItem(
      'collections',
      JSON.stringify(nextState)
    )
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
      
    this.setState(nextState)
    localStorage.setItem(
      'collections',
      JSON.stringify(nextState)
    )
    
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
      
    this.setState(nextState)
    localStorage.setItem(
      'collections',
      JSON.stringify(nextState)
    )
  }
  ratingMovies = (movieObj) => {
    const currentRating = movieObj.rating
    console.log('valor current rating en rating movies: ', currentRating)
    const currentMovie = movieObj.movie
    console.log('valor current movie en rating movies: ', currentMovie)
    const idCollection = movieObj.idCollection
    console.log('valor idCollection en rating movies: ', idCollection)
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
    // problema: no actualiza este estado la segunda vez aunque recibe bien los parámetros 
    console.log('valor de nextstate en rating movies: ', nextState)
    this.setState(nextState)
    localStorage.setItem(
      'collections',
      JSON.stringify(nextState)
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