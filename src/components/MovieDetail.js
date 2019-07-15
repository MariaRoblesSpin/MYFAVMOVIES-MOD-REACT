import React from 'react'

import Context from '../Context'

import SelectCollection from './SelectCollection'
import { movie } from '../api'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './styles/MovieDetail.css'
library.add(faHeart)


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
          ({ addMovieToCollection, deleteMovieFromCollection }) =>
            <div className='movie'>
              <img className='movie__image' src={IMAGE_URL + movie.poster_path} alt={movie.title} />
              <div className='movie__info'>
                <h2 className='movie__title'>{movie.title}</h2>
                <SelectCollection 
                  movie={movie} 
                  onSelect={addMovieToCollection} 
                  onDelete={deleteMovieFromCollection} 
                >
                  {
                    this.state.favorite &&
                    <FontAwesomeIcon icon='heart' />
                  }
                </SelectCollection>
                <p className='movie__content'>{movie.overview}</p>
              </div>
            </div>
        }
        
      </Context.Consumer>
      
    )
  }
}

export default MovieDetail