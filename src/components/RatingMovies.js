import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faStar)

class RatingMovies extends React.Component {
  render () {
    return (
      <FontAwesomeIcon icon='star' />
    )
  }
}

export default RatingMovies