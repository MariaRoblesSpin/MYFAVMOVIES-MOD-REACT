import React from 'react'
import { Link } from 'react-router-dom'
import Showcase from './Showcase'
import Movie from './Movie'
import { search } from '../api'
class SearchResults extends React.Component {
  state = { 
    movies: [], 
    loading: true, 
    error: false,
    showingResults: true 
  }
  componentDidMount = async () => {
    try {
      const movies = await search(this.props.query)
      this.setState({ showingResults: true, movies: movies, loading: false })
    } catch (error) {
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false })
    }
    console.log('valor de results: ', this.state.results)
  }
  render () {
    const { movies = [] } = this.state
    const noMovies = movies.length === 0
    if (noMovies) {
    return (
      <main className='search-results'>
        <p className='search-results__message'>Sorry! ...there are no movies for your search.</p>
        <button className='collection__button'> 
          <Link to='/'>
            Go to movies!
          </Link> 
        </button>
      </main>
      )
    } else {
      return (
        <main className='search-results'>
          <p className='search-results__message'>Here are the results for your search:</p>
          <Showcase 
            keyFn={element => element.id} 
            elements={movies} 
            render={movie =>
              <Link to={`/movie/${movie.id}`}>
                <Movie details={movie} />
              </Link>
            } 
          />
        </main>
      )
    }
  }
  hideResults = () => {
      this.setState({showingResults: false})
  }
}

export default SearchResults