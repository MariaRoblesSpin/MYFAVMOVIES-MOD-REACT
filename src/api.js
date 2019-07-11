const BASE_URL = 'https://api.themoviedb.org/3'
const LANGUAGE = 'en-US'
const API_KEY = 'e8d0c6f447943a0113e6530f4fc4b2fc'
const MOVIE_PATH = '/movie'
const SEARCH_PATH = '/search/movie'
const DISCOVER_PATH = '/discover/movie'

export const discover = async () => {
  const response = await fetch(`${BASE_URL}${DISCOVER_PATH}?api_key=${API_KEY}&language=${LANGUAGE}`)
  const { results } = await response.json()
  return results
}
export const search = async (query) => {
  if (query === ''){
      return ''
  }
  const response = await fetch(`${BASE_URL}${SEARCH_PATH}?api_key=${API_KEY}&language=${LANGUAGE}&query=${query}`)
  const { results } = await response.json()
  return results
}
export const movie = async (id) => {
  const response = await fetch(`${BASE_URL}${MOVIE_PATH}/${id}?api_key=${API_KEY}&language=${LANGUAGE}`)
  const movie = await response.json()
  return movie
}

