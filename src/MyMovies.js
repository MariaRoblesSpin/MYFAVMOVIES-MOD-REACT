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
    // no voy a emplear esta estructura porque convierto mis colecciones en un objeto multidimensional 
    // y pierdo los métodos de array para trabajar sobre ellas
    // const nextState = {
    //   collections: {
    //     [collection.id]: newCollection,
    //     ...previousState.collections
    //   }
    // }
    this.setState(nextState)
    localStorage.setItem(
      'collections',
      JSON.stringify(nextState.collections)
    )
  }
  addMovieToCollection = (idCollection, movie) => {
    // Es necesario añadir la película al array de películas existentes en la colección seleccionada
    // y sustituir la colección entre las existentes con la nueva película incluída.
    this.setState( previousState => {
      const newCollections = previousState.collections.map( collection => {
        if (collection.id === idCollection) {
          const newMovies = {
            ...collection.favMovies,
            movie
          }
          return Object.assign({}, collection, {
            favMovies: newMovies
          } )
        }
        return collection
      })
      return {
        collections: [ ...newCollections ] 
      }
      // no sé como meter collections de nuevo en localStorage puesto que después de un return no puedes añadir nada más
    })
    // localStorage.setItem(
    //   'collections',
    //   JSON.stringify(collections)
    // )
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
 
  // componentWillUnmount = () => {
  //   localStorage.clear();
  // }
  getMovies = (movies) => {
    this.setState({
      movies: movies
    });
  }
}



export default MyMovies