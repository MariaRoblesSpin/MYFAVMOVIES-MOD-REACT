import React from 'react'
import Showcase from './Showcase'
import Movie from './Movie'
import { Link } from 'react-router-dom'

// const MOVIES = Array
// .from({ length: 10 })
// .map((_, index) => ({
//   id: index,
//   title: 'un nombre', 
//   release_date:'2019', 
//   image: '', 
//   description: 'una descripción cualesquiera',
//   more: '+ more info'
// }))
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