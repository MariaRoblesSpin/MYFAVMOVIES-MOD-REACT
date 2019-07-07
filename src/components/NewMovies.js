import React from 'react'
import { Link } from 'react-router-dom'
import Showcase from './Showcase'
import Movie from './Movie'

// const MOVIES = Array
// .from({ length: 10 })
// .map((_, index) => ({
//   id: index,
//   name: 'un nombre', 
//   date:'2019', 
//   image: '', 
//   description: 'una descripción cualesquiera',
//   more: '+ more info'
// }))
const API_KEY = 'e8d0c6f447943a0113e6530f4fc4b2fc'
const NEW_MOVIES_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
class NewMovies extends React.Component {
  state = { movies: [], loading: true, error: false }
  componentDidMount = async () => {
    this.setState({ loading: true })
    try {
      this.setState({ loading: true })
      const response = await fetch(NEW_MOVIES_URL)
      const data = await response.json()
      this.setState({ movies: data.results })
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