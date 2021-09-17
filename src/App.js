/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import '../src/App.css'
import tmdb from "./tmdb.js";
import MovieRow from './components/movierow'
import FeaturedMovie from "./components/featuredMovie";
import Header from './components/header'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      //get all list
      let list = await tmdb.getHomeList()
      setMovieList(list)

      //getting the featured
      let originals = list.filter(i => i.slug === `originals`);
      let randNum = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randNum];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')
      
      setFeaturedData(chosenInfo)
    }

    loadAll();

  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 50) {
        setBlackHeader(true)
      } else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label='coração'>❤️</span> pela B7Web e TonAlmeida<br/>
        Direitos de imagem para NETFLIX<br/>
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 && 
      <div className='loading'>
        <img width='900' src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='loading' />
      </div>
      }
    </div>
  );
}