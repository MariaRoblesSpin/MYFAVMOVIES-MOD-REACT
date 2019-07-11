import React from 'react'
import './styles/NewCollection.css'
class NewCollection extends React.Component {
  state = { 
    title: '',
    description: ''
  }
  render () {
    const { title, description } = this.state
    return (
      <form className='form-new-list' onSubmit={this.handleSubmit}>
        <input name='title' className='form-new-list__input' placeholder='Choose a list name' onChange={this.handleChange} value={title} />
        <textarea name='description' className='form-new-list__textarea' placeholder='describe this collection' onChange={this.handleChange} value={description} />
        <button type='submit' className='form-new-list__button'>New Collection</button>
      </form>
    )
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const { title, description } = this.state
    if (!title.length) {
      return
    }
    this.props.onSubmit({ title, description })
  }
}

export default NewCollection