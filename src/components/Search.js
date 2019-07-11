import React from 'react'
import Context from '../Context'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/Search.css'
library.add(faSearch)
class Search extends React.Component {
  state = {
    showingForm: false,
    animate: 'staticForm',
    queryToSearch: ''
  }
  render () {
    const { showingForm, animate, queryToSearch } = this.state
    return (
      <Context.Consumer>
        {
          ({ getMovies }) =>
          <form onSubmit={event => this.searchMovie(event, getMovies)} className='search'>
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
        }
      </Context.Consumer>
    )
  }
  showForm = () => {
    this.setState({ showingForm:true, animate: 'movingForm' })
  }
  handleChange = event => {
    this.setState({ queryToSearch: event.target.value })
  }

  searchMovie = async (event, getMovies) => {
    event.preventDefault();
    const query = this.state.queryToSearch.replace(/ /g, '%20');
    const API_KEY = 'e8d0c6f447943a0113e6530f4fc4b2fc'
    const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`
    const SEARCH_MOVIES_URL = `${BASE_URL}&query=${query}`
    const response = await fetch(SEARCH_MOVIES_URL);
    const responseJSON = await response.json();

    getMovies(responseJSON.results);
    console.log('valor de función getMovies: ', getMovies(responseJSON.results))
  }
}

export default Search