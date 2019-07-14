import React from 'react'

import Context from '../Context'

import SelectCollection from './SelectCollection'
import { movie } from '../api'

import './styles/MovieDetail.css'


const IMAGE_URL = 'https://image.tmdb.org/t/p/w342/'

class MovieDetail extends React.Component {
  state = {
    loading: false, 
    error: false,
    movie: {}
  }
  componentDidMount = async () => {
    this.setState({ loading: true })
    try {
      const results = await movie(this.props.match.params.id);
      this.setState({ movie: results })
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
      return <p>Something went wrong... error 500!</p>
    }
    return (
      <Context.Consumer>
        {
          ({ addMovieToCollection, deleteMovieFromCollection }) =>
            <div className='movie'>
              <img className='movie__image' src={IMAGE_URL + movie.poster_path} alt={movie.title} />
              <div className='movie__info'>
                <h2 className='movie__title'>{movie.title}</h2>
                <SelectCollection 
                  movie={movie} 
                  onSelect={addMovieToCollection} 
                  onDelete={deleteMovieFromCollection} 
                />
                <p className='movie__content'>{movie.overview}</p>
              </div>
            </div>
        }
        
      </Context.Consumer>
      
    )
  }
}

export default MovieDetail