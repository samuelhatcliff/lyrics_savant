import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import React, { useState } from 'react';



function Search({ allArtists, setSearchQ, setLoading }) {
    const items = allArtists;

    // const handleOnSearch = () => {
    //     console.log(searchQ["id"], "on search")
    //     if (searchQ) {
    //         if (setArtistId2) {
    //             setArtistId2(searchQ["id"])
    //         } else {
    //             setArtistId(searchQ["id"])
    //             setLoading(true)
    //         }
    //     }
    // }
    const handleOnHover = (result) => {
        // the item hovered
        // console.log(result, "on hover")
    }
    const handleOnSelect = (item) => {
        // the item selected
        if (setSearchQ) {
            setSearchQ(item)
        }
        // console.log(item, "on select")
    }
    const handleOnFocus = () => {
        // console.log('Focused')
    }
    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                        items={items}
                        // onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                    />
                </div>
            </header>
        </div>
    )
}

export default Search;