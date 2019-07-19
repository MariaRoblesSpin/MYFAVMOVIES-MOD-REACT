import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MyFavMovies from './components/MyFavMovies'
import NewMovies from './components/NewMovies'
import MovieDetails from './components/MovieDetails'
import SearchResults from './components/SearchResults'

import './components/styles/Error.css'

export default () =>
<Switch>
  <Route exact path='/' component={NewMovies} />
  <Route exact path='/myfavmovies' component={MyFavMovies} />
  <Route exact path='/movie/:id' component={MovieDetails} />
  <Route exact path='/search/:query' render={({ match }) => {
      const { query } = match.params
      return <SearchResults key={query} query={query} />
    }} />
  <Route component={() => 
    <main>
      <p className='error__message'>
        <span className='error__message--bigger'>Error 404</span><br/>
        Upssssss, we can't find what you're looking for
        </p></main>
    }
  />
</Switch>

