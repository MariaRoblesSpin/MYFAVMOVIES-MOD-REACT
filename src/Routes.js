import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MyFavMovies from './components/MyFavMovies'
import NewMovies from './components/NewMovies'
import MovieDetails from './components/MovieDetails'

export default () =>
<Switch>
  <Route exact path='/' component={NewMovies} />
  <Route exact path='/myfavmovies' component={MyFavMovies} />
  <Route path='/movie/:id' component={MovieDetails} />
  <Route component={() => <p>Error 404, we can't find what you're looking for</p>} />
</Switch>

export const routes = {
  popularMovies: () => '/',
  movieDetails: movieId => `/movie/${movieId}`,
  searchResults: query => `/search/${query}`,
  movieCollections: () => '/collections',
  collectionDetails: collectionId => `/collections/${collectionId}`
}