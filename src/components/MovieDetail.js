import React from 'react'
import SelectList from './SelectList'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w342/'
const API_KEY = 'e8d0c6f447943a0113e6530f4fc4b2fc'

class MovieDetail extends React.Component {
  state = {
    loading: false, 
    error: false,
    movie: {}
  }
  async componentDidMount () {
    const MOVIE_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${API_KEY}`
    try {
      this.setState({ loading: true })
      const response = await fetch(MOVIE_URL)
      const data = await response.json()
      this.setState({ movie: data })
    } catch (error) {
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false })
    }
  }
  render () {
    const { loading, error, movie } = this.state
    if (loading) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>Something went wrong!</p>
    }
    return (
      <div className='movie'>
        <img className='movie__image' src={IMAGE_URL + movie.poster_path} alt={movie.title} />
        <div className='movie__info'>
          <h2 className='movie__title'>{movie.title}</h2>
          <div className='movie__favorite'>
            <SelectList />
          </div>
        </div>
        <div className='movie__content'>{movie.overview}</div>
      </div>
    )
  }
}

export default MovieDetail