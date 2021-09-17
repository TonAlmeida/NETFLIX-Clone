/* eslint-disable import/no-anonymous-default-export */

import { NavigateNext } from "@material-ui/icons";
import React, { useState } from "react";
import '../movierow/movierow.css';
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';


export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(-500)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2)
        if(x > 0) {
            x = 0
        }
        setScrollX(x)
    }

    const handleRightArrow = () => {
        let x = scrollX + Math.round(-window.innerWidth / 2);
        let listW = items.results.length * 150;
        if((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60
        }
        setScrollX(x)
    }

    return (
        <div className="movierow">
            <h2>{title}</h2>
            <div className='movierow-left' onClick={handleLeftArrow}>
                <FaAngleLeft style={{fontSize: 50}} />
            </div>
            <div className='movierow-right' onClick={handleRightArrow}>
                <FaAngleRight style={{fontSize: 50}}/>
            </div>
            


            <div className="movierow--listarea">
                <div className="movierow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 160
                }}>
                    {items.results.map((item, key)=> (
                        <div key={key} className="movierow--item">
                            <img key={key} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.origianl_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}