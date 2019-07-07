import React from 'react'
import NewLists from './NewLists'
import MyLists from './MyLists'

class MyFavMovies extends React.Component {
  render () {
    return (
      <>
        <p>There is no list yet.</p>
        <NewLists />
        <MyLists />
      </>
    )
  }
}

export default MyFavMovies