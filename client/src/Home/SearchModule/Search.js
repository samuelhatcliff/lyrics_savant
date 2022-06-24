import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../../App.css'

function Search({ allArtists, setSearchQ, setSelected, type = "search", secondarySearch }) {
    const items = allArtists;
    const handleOnSearch = (string) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        if (type === "contribute") {
            setSearchQ(string)
        }
    }
    const handleOnHover = (result) => {
        // the item hovered
        // console.log(result, "on hover")
    }
    const handleOnSelect = (item) => {
        // the item selected
        if (type === "search") {
            setSelected(item)
        }
        if (type === "contribute") {
            setSearchQ(item['name'])
        }
    }
    const handleOnFocus = () => {
        // console.log('Focused')
    }
    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left', zIndex: 0 }}>{item.name}</span>
            </>
        )
    }
    return (
        <div>
            {secondarySearch ? (
                <div style={{ width: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 0 }} >
                    <ReactSearchAutocomplete

                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus

                        formatResult={formatResult}
                    />
                </div>) : (<div style={{ width: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }} >
                    <ReactSearchAutocomplete

                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus

                        formatResult={formatResult}
                    />
                </div>)}
        </div>

    )
}

export default Search;