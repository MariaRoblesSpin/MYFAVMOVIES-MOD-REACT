import React from 'react'
import Rating from 'react-rating'

class MovieRating extends React.Component {
  state = { rating: 0}
  render () {
    const { rating } = this.state
    return (
      <Rating 
        // emptySymbol='fa fa-star-o fa-2x' 
        // fullSymbol='fa fa-star fa-2x' 
        initialRating={rating}
        direction='ltr' 
        onChange={this._handleRating}
        // onChange={rate => alert(rate)}
        value={rating}
      />  
      
    )
  }
  _handleRating = (value) => {
    try {
      const rating = value
      const movie = this.props.movie
      const idCollection = this.props.idCollection
      this.props.onRating({ rating, movie, idCollection })
      this.props.rate({ movie, idCollection })
    } catch (error) {
      console.log('error in handleRating: ', error)
    }
  }
}

export default MovieRating
