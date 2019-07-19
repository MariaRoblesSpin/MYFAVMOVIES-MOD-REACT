import React from 'react'
import { withRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/Search.css'
library.add(faSearch)
class SearchQuery extends React.Component {
  state = {
    showingForm: false,
    animate: 'staticForm',
    queryToSearch: ''
  }
  render () {
    const { showingForm, animate, queryToSearch } = this.state
    return (
      <form onSubmit={this._handleSubmit} className='search'>
        <div className={animate}>
          <FontAwesomeIcon className='search__icon' icon='search' onClick={this._showForm} />
          {
            showingForm &&
            <>
              <input className='search__input' placeholder="Search a favMovie" type='text' value={queryToSearch} onChange={this._handleChange}/>
              <button type='submit' className='search__button' disabled={!queryToSearch}>Find it!</button>
            </>
          }
        </div>
      </form>
    )
  }
  
  _hideResults = () => {
      this.setState({showingForm: false, animate: 'staticForm'})
  }
  _showForm = () => {
    this.setState({ showingForm:true, animate: 'movingForm' })
  }
  _handleChange = event => {
    this.setState({ queryToSearch: event.target.value })
  }
  _handleSubmit = async (event) => {
    event.preventDefault();
    const query = this.state.queryToSearch
    if (query.trim().length > 0) {
      this.props.history.push(`/search/${query}`)
    }
    this._hideResults()
  }
}

export default withRouter(SearchQuery)