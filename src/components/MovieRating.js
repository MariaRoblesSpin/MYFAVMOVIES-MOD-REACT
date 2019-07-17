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
  componentWillUpdate = (nextProps, nextState) => {
    // console.log('valor prevState: ', nextState)
    // console.log('valor this.state: ', this.state)
    // if (nextState.rating != this.state.rating) {
    //   this.setState({ rating: nextState.rating })
    // }
  }
  _handleRating = (value) => {
    try {
      console.log('valor de value en handlerating: ', value)
      const rating = value
      const movie = this.props.movie
      const idCollection = this.props.idCollection
      // problema: graba el valor de rating al segundo click y en ningún momento lo recupera en este componente aunque le paso la función ratedMovie
      console.log('valor de rating en handlerating: ', rating)
      this.setState({ rating: value })
      console.log('valor de rating tras setState en handlerating: ', rating)
      this.props.onRating({ rating, movie, idCollection })
    } catch (error) {
      console.log('error in handleRating: ', error)
    }
  }
  ratedMovie = (currentMovie, collections) => {
    collections.map(collection => {
        collection.favMovies.map( favMovie => {
          if (favMovie.id == currentMovie.id) {
            console.log('valor favMovie.rating: ', favMovie.rating)
            const getRating = favMovie.rating
            this.setState({ rating: getRating})
        }})
      })
  }
}

export default MovieRating
