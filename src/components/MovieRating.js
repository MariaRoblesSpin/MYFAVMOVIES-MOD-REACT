import React from 'react'
import Rating from 'react-rating'

class MovieRating extends React.Component {
  state = { }
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
  componentWillUpdate = (nextProps, nextState) => {
    console.log('valor prevState: ', nextState)
    console.log('valor this.state: ', this.state)
    if (nextState.rating != this.state.rating) {
      this.setState({ rating: nextState.rating })
    }
  }
  _handleRating = (value) => {
    try {
      console.log('valor de value en handlerating: ', value)
      const { rating } = this.state 
      const movie = this.props.movie
      const idCollection = this.props.idCollection
      // De esta manera no funciona el on rating (llega el dato con un click de retraso), y tampoco funciona el rate
      
      // callback de this props rate y onrating para resolver los problemas de asincronía del setState
      this.setState({ rating: value }, () => {
        this.props.rate({ movie, idCollection })
    })
      this.props.onRating({ rating, movie, idCollection })
      console.log('valor de rating en handlerating: ', rating)
      console.log('valor de movie en handlerating: ', movie)
      console.log('valor de idCollection en handlerating: ', idCollection)
      // this.props.rate({ movie, idCollection })
    } catch (error) {
      console.log('error in handleRating: ', error)
    }
  }
}

export default MovieRating
