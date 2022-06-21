import React, { useState, useEffect } from 'react';
//Our Components
import Artist from "./Artist/Artist";
import Compare from "./Compare/Compare";
//Styling Components
import { Circles } from 'react-loader-spinner';
import './Results.css';



const Results = ({ artistId, artistId2, setLoading, isLoading, setIsLoaded, isLoaded }) => {
    const [artist, setArtist] = useState(null)
    const [artist2, setArtist2] = useState(null)
    const [wc, setWc] = useState(null)
    const [wc2, setWc2] = useState(null)
    const [artistSongs, setArtistSongs] = useState([])
    const [artistSongs2, setArtistSongs2] = useState([])

    useEffect(() => {
        wcPromise = fetch(`/api/artists/${artistId}/wc`).then(
            res => res.json().then(
                initialData => {
                    const data = initialData['data']
                    setWc(data)
                }
            ))
        if (artistId2) {
            wcPromise2 = fetch(`/api/artists/${artistId2}/wc`).then(
                res => res.json().then(
                    initialData => {
                        const data = initialData['data']
                        setWc2(data)
                    }
                ))
        }
    }, [artistId, artistId2])

    let wcPromise;
    let wcPromise2;
    useEffect(() => {
        let p2;
        let getSongs2;
        const p1 = fetch(`/api/artists/${artistId}`).then( // gets data for 1st artist
            res => res.json()
        ).then(
            initialData => {
                setArtist(initialData);
            }
        )
        const getSongs = fetch(`/api/artists/${artistId}/songs`).then( // gets data for 1st artist
            res => res.json()
        ).then(
            initialData => {
                setArtistSongs(initialData['songs']);
            }
        )
        if (artistId2) {
            p2 = fetch(`/api/artists/${artistId2}`).then( // gets data for 1st artist
                res => res.json()
            ).then(
                initialData => {
                    setArtist2(initialData);
                }
            )
            getSongs2 = fetch(`/api/artists/${artistId2}/songs`).then( // gets data for 1st artist
                res => res.json()
            ).then(
                initialData => {
                    setArtistSongs2(initialData['songs']);
                }
            )
        } else {
            Promise.resolve(p1).then(resolved => {
                setLoading(false)
                setIsLoaded(true)
            }
            )
        }
        if (artistId2) {
            Promise.all([p1, p2, wcPromise, wcPromise2]).then(resolved => {
                setLoading(false)
                setIsLoaded(true)
            })
        }
    }, [artistId, artistId2, isLoading])


    return (
        < >
            <div>
                {!isLoaded && isLoading ? (<hr></hr>
                )
                    :
                    (<></>)}
            </div>
            {!isLoading ? (
                <div style={{ height: '60%', width: '100%' }}>
                    {!artist2 ? (
                        <div
                            //  className="single-column-container"
                            className="single-row-container"
                        >
                            <Artist
                                artist={artist}
                                artistSongs={artistSongs}
                                wc={wc}
                            />
                        </div>) : (
                        <></>
                    )}
                    {artist2 ? (
                        <div className="container">
                            <Artist artist={artist} artistSongs={artistSongs} compare={true} wc={wc} />
                            <Compare artist1={artist} artist2={artist2} />
                            <Artist artist={artist2} artistSongs={artistSongs2} compare={true} wc={wc2} />
                        </div>
                    ) : (
                        <></>)}
                </div>
            ) : (
                <div className="loading">
                    Loading...
                    <Circles color="#00BFFF" height={80} width={80} />
                </div>
            )
            }
        </>
    )
}


export default Results



