import React from 'react'

import Context from '../Context'

import SelectCollection from './SelectCollection'
import { movie } from '../api'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './styles/MovieDetails.css'
library.add(faHeart)


const IMAGE_URL = 'https://image.tmdb.org/t/p/w342/'

class MovieDetails extends React.Component {
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
  componentWillUpdate = async (prevProps, prevState) => {
    console.log('valor de prevstate.movie.id : ', prevState.movie.id)
    console.log('valor de this.props.match.params.id : ', this.props.match.params.id)
    const results = await movie(this.props.match.params.id);
    if (prevState.movie.id === undefined) {
      console.log('pasa por prevState.movie.id undefined')
    } else if (prevState.movie.id != this.props.match.params.id) {
      this.setState({ movie: results })
      console.log('pasa por valores diferentes ')
    } else {
      console.log('pasa por else')
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
          ({ addMovieToCollection, deleteMovieFromCollection, collections }) =>
            <div className='movie'>
              <div className='movie__image-box'>
                <img className='movie__image' src={IMAGE_URL + movie.poster_path} alt={movie.title} />
              </div>    
              <div className='movie-info'>
                <h1 className='movie-info__title'>{movie.title}</h1>
                <SelectCollection
                  movie={movie} 
                  collections={collections}
                  onSelect={addMovieToCollection} 
                  onDelete={deleteMovieFromCollection} 
                >
                  {
                    this.state.favorite &&
                    <FontAwesomeIcon icon='heart' />
                  }
                </SelectCollection>
                <p className='movie-info__content'>{movie.overview}</p>
                <div className='movie-info__genres'>
                  <h2 className='movie-info__literal'>Genres:</h2>
                  {
                    movie.genres &&
                    <ul>
                    {
                      movie.genres.map( genre => {
                        return (
                          <li key={genre.id}>
                            {genre.name}
                          </li>
                        )
                      })
                    }
                    </ul>
                  }
                </div>
                <div className="movie-info__release_date">
                  <h2 className='movie-info__literal'>Release Date: </h2>
                  <p>{movie.release_date}</p>
                </div>
              </div>
            </div>
        }
        
      </Context.Consumer>
      
    )
  }
}

export default MovieDetails