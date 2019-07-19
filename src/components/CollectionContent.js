import React from 'react'
import Showcase from './Showcase'
import Movie from './Movie'
import { Link } from 'react-router-dom'


class CollectionContent extends React.Component {
  render () {
    return (
      <Showcase keyFn={(element) => (element.id)} elements={this.props.favMovies} render={movie =>
        <Link to={`/movie/${movie.id}`}>
          <Movie details={movie} />
        </Link>
      } />
      
    )
  }
}
export default CollectionContent