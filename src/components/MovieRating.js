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
      
      // Así recoge bien el dato para mandarlo al on Rating pero no funciona el rate
      // const rating = value 
      const movie = this.props.movie
      const idCollection = this.props.idCollection
      // De esta manera no funciona el on rating (llega el dato con un click de retraso), y tampoco funciona el rate
      const { rating } = this.state 
      // callback de this props rate y onrating para resolver los problemas de asincronía del setState
      this.setState({ rating: value }, () => {
        this.props.rate({ movie, idCollection })
    })
      this.props.onRating({ rating, movie, idCollection })
      // this.props.rate({ movie, idCollection })
    } catch (error) {
      console.log('error in handleRating: ', error)
    }
  }
}

export default MovieRating
