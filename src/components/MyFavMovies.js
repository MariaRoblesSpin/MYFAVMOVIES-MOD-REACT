import React from 'react'
import NewList from './NewList'
import MyLists from './MyLists'
const LISTS = Array
.from({ length: 10 })
.map((_, index) => ({
  id: index,
  name: 'un nombre de lista', 
  description: 'una descripción cualesquiera',
}))
class MyFavMovies extends React.Component {
  render () {
    return (
      <>
        <p>Aquí van las listas de películas favoritas</p>
        <NewList />
        {
          LISTS.length > 0
            ? <MyLists getInfo={LISTS} />
            : <p>There is no list created yet.</p>
        }
      </>
    )
  }
}

export default MyFavMovies