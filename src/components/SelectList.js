import React from 'react'
import RatingMovies from './RatingMovies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class SelectList extends React.Component {
  state = { showingForm: false }
  render () {
    const { showingForm } = this.state
    return (
      <>
        <button className='button button__round' onClick={this.showingForm}>
          <FontAwesomeIcon icon='heart' />
        </button>
        { showingForm &&
          <div className='movie__rating'>
          <RatingMovies />
        </div>
        }
        
      </>
    )
  }
  showingForm = () => {
    this.setState({ showingForm: true })
  }
}

export default SelectList