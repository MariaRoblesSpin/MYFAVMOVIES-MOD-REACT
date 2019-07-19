import React from 'react'
import './styles/NewCollection.css'
class NewCollection extends React.Component {
  state = { 
    title: '',
    description: '',
    createdCollection: false
  }
  render () {
    const { title, description, createdCollection } = this.state
    return (
      <>
      <form className='form-new-list' onSubmit={this._handleSubmit}>
        <input name='title' className='form-new-list__input' placeholder='Choose a list name' onChange={this._handleChange} value={title} />
        <textarea name='description' className='form-new-list__textarea' placeholder='describe this collection' onChange={this._handleChange} value={description} />
        <button type='submit' className='form-new-list__button'>New Collection</button>
      </form>
      {
        createdCollection &&
        <p className='form-new-list__message'> The <strong>{title}</strong> collection has been created properly.</p>
      }
      </>
    )
  }
  _handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  _handleSubmit = (event) => {
    event.preventDefault()
    const { title, description } = this.state
    if (!title.length) {
      return
    }
    this.setState({ createdCollection: true })
    this.props.onSubmit({ title, description })
    
  }
}

export default NewCollection