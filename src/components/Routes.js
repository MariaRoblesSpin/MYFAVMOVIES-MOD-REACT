import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MyFavMovies from './MyFavMovies'
import NewMovies from './NewMovies'
import MovieDetail from './MovieDetail'

export default () =>
<Switch>
  <Route exact path='/' component={NewMovies} />
  <Route exact path='/myfavmovies' component={MyFavMovies} />
  <Route path='/movie/:id' component={MovieDetail} />
  <Route component={() => <p>Error 404, we can't find what you're looking for</p>} />
</Switch>