import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import React, { useState } from 'react';


// To-do: change format result so name is the only thing that returns

function Search({ allArtists, setSearchQ, type = "search" }) {
    const items = allArtists;
    const errorMsg = `The artist you have searched for is not in our database. If you'd like to add this artist, you can click on the "Contribute" tab in the navbar.`
    const handleOnSearch = (string) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string)
        if (type === "contribute") {
            setSearchQ(string)
            console.log("type = contriubte")
        }
    }


    // const showString = (string) => {
    //     if (type === "contribute") {
    //         setSearchQ(string)
    //         console.log("type = contriubte")
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
        console.log(item, "on select")
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
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        // onChange={showString}
                        autoFocus
                        formatResult={formatResult}
                    />
                </div>
            </header>
        </div>
    )
}

export default Search;