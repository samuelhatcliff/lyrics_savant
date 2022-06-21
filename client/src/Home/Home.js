import React, { useState } from 'react';
// Our own components 
import SearchModule from './SearchModule/SearchModule';
import Results from "./Results/Results";
import Explanation from "./Explanation/Explanation";


function Home({ allArtists }) {
    const [artistId, setArtistId] = useState(null);
    const [artistId2, setArtistId2] = useState(null)
    const [submit, setSubmit] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);


    return (
        <>
            <SearchModule setSubmit={setSubmit}
                setLoading={setLoading}
                allArtists={allArtists}
                setArtistId={setArtistId}
                setArtistId2={setArtistId2}
                submit={submit}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}

            />
            {submit ? (
                <Results artistId={artistId}
                    artistId2={artistId2}
                    setLoading={setLoading}
                    isLoading={isLoading}
                    setIsLoaded={setIsLoaded}
                    isLoaded={isLoaded}

                />
            ) : (
                <></>
            )}

            {!submit ? (
                <div>
                    <hr></hr>
                    <Explanation />
                </div>) : <></>}
        </>
    );
}

export default Home;