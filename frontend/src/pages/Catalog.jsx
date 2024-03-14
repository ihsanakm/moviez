import React from 'react';

import { category } from '../api/tmdbApi';



import MovieGrid from '../components/movieGrid/MovieGrid';

const Catalog = () => {


    return (
        <>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}/>
                </div>
            </div>
        </>
    );
}

export default Catalog;
