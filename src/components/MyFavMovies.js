import React from 'react'
import NewCollection from './NewCollection'
import MyCollections from './MyCollections'
import './styles/MyFavMovies.css'
import Context from '../Context'

class MyFavMovies extends React.Component {
  state = { showingForm: false }
  render () {
    const { showingForm } = this.state
    return (
      <Context.Consumer>
        {
          ({ addCollection, collections, deleteCollection }) =>
          <div className='my-fav-movies'>
          <button className='my-fav-movies__button' onClick={this.showForm}>Create a collection!</button>
          {
            showingForm &&
            <NewCollection onSubmit={addCollection} />
          }
          {
            collections.length > 0
              ? <MyCollections details={collections} onDelete={deleteCollection} />
              : <p className='my-fav-movies__message'>There is no collection created yet.</p>
          }
          </div>
        }
      </Context.Consumer>
     
    )
  }
  showForm = () => {
    this.setState({ showingForm: true })
  }
}

export default MyFavMovies