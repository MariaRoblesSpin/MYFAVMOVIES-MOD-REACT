import React from 'react'
import { Link } from 'react-router-dom'
import Showcase from './Showcase'
import Movie from './Movie'
import { discover } from '../api'
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
      return <p>Loading... </p>
    }
    if (error) {
      return <p>Error 500!</p>
    }
    return (
      // tiene que mostrar una lista de películas nuevas
      <>
        <p>Discover the news</p>
        <Showcase 
          keyFn={element => element.id} 
          elements={movies} 
          render={movie =>
            <Link to={`/movie/${movie.id}`}>
              <Movie details={movie} />
            </Link>
          } 
        />
      </>
    )
  }
}

export default NewMovies