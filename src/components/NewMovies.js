import React from 'react'
import { Link } from 'react-router-dom'
import Showcase from './Showcase'
import Movie from './Movie'
import Context from '../Context'
import { discover } from '../api'
import './styles/NewMovies.css'
class NewMovies extends React.Component {
  state = { 
    movies: [], 
    loading: true, 
    error: false 
  }
  componentDidMount = async () => {
    this.setState({ loading: true })
    try {
      const results = await discover()
      this.setState({ movies: results })
    } catch (error) {
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false })
    }
  }
  render () {
    const { movies, loading, error } = this.state
    if (loading) {
      return <p className='movie__message'>Loading... </p>
    }
    if (error) {
      return <p className='movie__message'>Error 500!</p>
    }
    return (
      <Context.Consumer>
        {
          ({ collections }) => 
            <main className='new-movies'>
              <h1 className='new-movies__title'>Discover the news</h1>
              <Showcase 
                keyFn={element => element.id} 
                elements={movies} 
                render={movie =>
                  <Link to={`/movie/${movie.id}`}>
                    <Movie toFavorite={() => this.addFavorite(collections, movie)} details={movie} />
                  </Link>
                } 
              />
            </main>
        }
      </Context.Consumer>
      // tiene que mostrar una lista de películas nuevas
      
    )
  }
  addFavorite = (collections, movie) => {
    collections.map(collection => {
      collection.favMovies.map( favMovie => {
        if (favMovie.id == movie.id) {
          return this.setState({ favorite: true })
        }
      })
    })
  }
}

export default NewMovies