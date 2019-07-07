import React from 'react'
import ListContent from './ListContent'
class MyLists extends React.Component {
  render () {
    return  (
      <ul className='list'>
      {
        this.props.getInfo.map((list) => (
          <li className='list__item' key={(list.id)}>
            <h3 className='list__title'>{list.name}</h3>
            <p className='list__description'>{list.description}</p>
            <ListContent idList={list.id} />
          </li>
        ))}
    </ul>
    )
  }
}

export default MyLists