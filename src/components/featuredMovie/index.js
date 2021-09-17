/* eslint-disable import/no-anonymous-default-export */

import React from "react";
import './featuredMovie.css'

export default ({item}) => {
    let description = item.overview;
    description = description.split(` `)
    if(description.length > 50) {
        description = description.slice(0, 50)
            .join(` `).concat(`...`)
    } else {
        description = description.join(` `)
    }

    let fistDate = new Date(item.first_air_date);
    let genres = []
    for(let i in item.genres) {
        genres.push(item.genres[i].name)
    }
    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <h1 className="featured--name">{item.original_name}</h1>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{fistDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons > 1 ? 's' : ''}</div>
                    </div>
                    <div className="featrured--description">{description}</div>
                    <div className="featured--buttons">
                        <a className="featured--watch" href={`/watch/${item.id}`}>▶ Assistir</a>
                        <a className="featured--mylist" href={`/list/add/${item.id}`}>+ minha lista</a>
                    </div>
                    <div className="featured--genres"><strong>Geners:</strong> {genres.join(', ')}</div>
                </div>
            </div>
        </section>
    );
}