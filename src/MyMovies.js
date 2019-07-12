import React from 'react'

import Nav from './components/Nav'
import Routes from './Routes'
import Context from './Context'

class MyMovies extends React.Component {
  state = {
    collections: JSON.parse(localStorage.getItem('collections')) || []
  }
  addCollection = collection => {
    // Es necesario crear la estructura de la colección que se va a crear con una array vacío de películas favoritas dentro 
    // para poder rellenarlo a continuación.
    collection.id = Date.now().valueOf()
    const previousState = this.state
    const newCollection= {
      id: collection.id,
      title: collection.title,
      description: collection.description,
      favMovies: []
    }
    const nextState = {
        collections: [
          newCollection,
          ...previousState.collections
        ]
      }
    
    const alreadyCreated = previousState.collections.find(({ title }) => title === newCollection.title)
    
    if (!alreadyCreated) {
      this.setState(nextState)
      localStorage.setItem(
        'collections',
        JSON.stringify(nextState.collections)
      )
    }
  }
  addMovieToCollection = (idCollectionObj) => {
    // Es necesario añadir la película al array de películas existentes en la colección seleccionada
    // y sustituir la colección entre las existentes con la nueva película incluída.
    console.log('valor de idCollection en el objeto que recibo de handleselect: ', idCollectionObj.value)
    console.log('valor de movie en el objeto que recibo de handleselect XXXXXXXXXXXXXXXXX: ', idCollectionObj.movie)
    const selectedCollection = idCollectionObj.value
    const newMovie = idCollectionObj.movie
    const previousState = this.state
    const newCollections = previousState.collections.map( (collection) => {
      console.log('Comprobando valor de newMovie: ', newMovie)
      if (collection.id == selectedCollection) {
        const favMovies = collection.favMovies
        const alreadyInCollection = favMovies.find(({ id }) => id === newMovie.id)
        if (!alreadyInCollection) {
          favMovies.unshift(newMovie)
        }

        // MAL: con esta estructura aparece la collección con el key collection, a continuación el key favMovies con el contenido de newMovie.
        // return {
        //   collection,
        //   favMovies: {
        //     newMovie,
        //     ...favMovies
        //   } 
        // }
        // MAL: Con esta estructura queda newMovie dentro de favMovies con el nombre de propiedad newMovie y además en el nivel de collection. 
        // return Object.assign(
        //   {},
        //   collection, 
        //   collection.favMovies = {
        //     newMovie,
        //     ...collection.favMovies
        //   }
        // )
      }
      return collection
    })
    const nextState = [
      ...newCollections
    ]
    console.log('valor de newObjCollections: ', nextState)
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
        addMovieToCollection: this.addMovieToCollection
      }}>
          <Nav/>
          <Routes/>
      </Context.Provider>
    )
  }
 
  componentWillUnmount = () => {
    localStorage.clear();
  }
  getMovies = (movies) => {
    this.setState({
      movies: movies
    });
  }
}



export default MyMovies