import React from 'react'
import Rating from 'react-rating'

class MovieRating extends React.Component {
  state = {
    rating: 0
  }
  render () {
    const { rating } = this.state
    return (
      <Rating 
        emptySymbol='fa fa-star-o fa-2x' 
        fullSymbol='fa fa-star fa-2x' 
        initialRating={rating}
        direction='ltr' 
        onClick={this._handleRating}
        value={rating}
      />  
    )
  }
  componentDidMount = () => {
    this.ratedMovie(this.props.movie, this.props.collections)
  }
  _handleRating = (value) => {
    try {
      const rating = value
      const movie = this.props.movie
      const idCollection = this.props.idCollection
      this.setState({ rating: value })
      this.props.onRating({ rating, movie, idCollection })
    } catch (error) {
      console.log('error in handleRating: ', error)
    }
  }
  ratedMovie = (currentMovie, collections) => {
    collections.map(collection => {
        collection.favMovies.map( favMovie => {
          if (favMovie.id == currentMovie.id) {
            const getRating = favMovie.rating
            this.setState({ rating: getRating})
        }})
      })
  }
}

export default MovieRating
