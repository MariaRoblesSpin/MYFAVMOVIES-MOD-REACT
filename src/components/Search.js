import React from 'react'
import { Link } from 'react-router-dom'
import Showcase from './Showcase'
import Movie from './Movie'
import { search } from '../api'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/Search.css'
library.add(faSearch)
class SearchQuery extends React.Component {
  state = {
    showingForm: false,
    animate: 'staticForm',
    queryToSearch: '',
    results: ''
  }
  render () {
    const { showingForm, animate, queryToSearch, showingResults, results } = this.state
    return (
      <>
      <form onSubmit={event => this.searchMovie(event)} className='search'>
        <div className={animate}>
          <FontAwesomeIcon className='search__icon' icon='search' onClick={this.showForm} />
          {
            showingForm &&
            <>
              <input className='search__input' placeholder="Search a favMovie" type='text' value={queryToSearch} onChange={this.handleChange}/>
              <button type='submit' className='search__button' disabled={!queryToSearch}>Find it!</button>
            </>
          }
        </div>
      </form>
      {
        showingResults &&
        <>
          <button onClick={this.hideResults}>Hide results</button>
          <p>Here are the results for your search:</p>
          <Showcase 
            keyFn={element => element.id} 
            elements={results} 
            render={movie =>
              <Link to={`/movie/${movie.id}`} onClick={this.hideResults}>
                <Movie details={movie} />
              </Link>
            } 
          />
        </>
      }
      </>
    )
  }
  hideResults = () => {
      this.setState({showingResults: false})
  }
  showForm = () => {
    this.setState({ showingForm:true, animate: 'movingForm' })
  }
  handleChange = event => {
    this.setState({ queryToSearch: event.target.value })
  }
  searchMovie = async (event) => {
    event.preventDefault();
    const query = this.state.queryToSearch.replace(/ /g, '%20')
    this.setState({ loading: true })
    try {
      const results = await search(query)
      this.setState({ showingResults: true, results: results, loading: false })
    } catch (error) {
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false })
    }
    console.log('valor de results: ', this.state.results)
  }
}

export default SearchQuery