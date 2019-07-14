import React from 'react'
import { Link } from 'react-router-dom'
import Showcase from './Showcase'
import Movie from './Movie'
class SearchResults extends React.Component {
  state = { 
    movies: [], 
    loading: true, 
    error: false,
    showingResults: true 
  }
  render () {
    const { loading, error } = this.state
    if (loading) {
      return <p>Loading... </p>
    }
    if (error) {
      return <p>Error 500!</p>
    }
    return (
      <>
        <button onClick={this.hideResults}>Hide results</button>
        <p>Here are the results for your search:</p>
        <Showcase 
          keyFn={element => element.id} 
          elements={this.props.details} 
          render={movie =>
            <Link to={`/movie/${movie.id}`}>
              <Movie details={movie} />
            </Link>
          } 
        />
      </>
    )
  }
  hideResults = () => {
      this.setState({showingResults: false})
  }
}

export default SearchResults