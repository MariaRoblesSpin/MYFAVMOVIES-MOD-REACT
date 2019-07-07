import React from 'react'
const IMAGE_URL = `https://image.tmdb.org/t/p/w342/`

export default props =>
<div className="movie-resume">
    <img className="movie-resume__image" src={IMAGE_URL + props.details.poster_path} alt={props.details.title} />    
    <h2 className="movie-resume__name">{props.details.title}<span>{props.details.release_date}</span></h2>
    <p className="movie-resume__description">{props.details.overview}</p>
    <p className="movie-resume__more"> + More info</p>
</div>

