import React, { useState } from 'react';
//Our Components
import Search from "./Search";
//MUI Components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ClearButton from "./ClearButton";
import './SearchModule.css'

const SearchModule = ({ setSubmit, setLoading, setArtistId, setArtistId2, allArtists }) => {
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState(null)
    const [selected2, setSelected2] = useState(null)

    const handleChecked = () => {
        setChecked(!checked);
    };

    if (!checked && selected2) {
        setSelected2(null)
    }

    const handleOnSearch = () => {
        if (selected) {
            setArtistId(selected["id"])
            if (selected2) {
                setArtistId2(selected2["id"])
            }
            setSubmit(true)
            setLoading(true)
        }
    }

    return (
        <div className="search-module-container">
            {checked ? (
                <div>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        <span>Selected Artist:
                            {selected ? (
                                <span className="selected">
                                    {selected["name"]}
                                </span>
                            ) : (<></>)}
                        </span>
                        <Search allArtists={allArtists}
                            className={"search1"}
                            setSelected={setSelected} />
                        <span>Selected Artist:
                            {selected2 ? (
                                <span className="selected">{selected2["name"]}</span>
                            ) : (<></>)}
                        </span>
                        <Search allArtists={allArtists}
                            className={"search2"}
                            placeholder="search2"
                            setSelected={setSelected2} />
                    </Typography>
                </div>
            )
                : (
                    <div>
                        <Typography variant="subtitle1" component="div" gutterBottom>
                            <span>Selected Artist:
                                {selected ? (
                                    <span className="selected">
                                        {selected["name"]}
                                    </span>
                                ) : (<></>)}
                            </span>
                            <Search allArtists={allArtists}
                                setSelected={setSelected} />
                        </Typography>
                    </div>
                )}
            <label  >
                <Typography variant="body2" component="div" gutterBottom style={{ display: 'inline' }}>
                    <Checkbox placeholder="checkbox" onChange={handleChecked} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style={{ display: 'inline', zIndex: -1 }} />
                    <span>Compare two separate artists?</span>
                </Typography>
            </label>
            <Button
                disabled={selected ? false : true}
                className="button"
                variant="contained"
                color="success"
                onClick={handleOnSearch}
                style={{ display: 'block', marginBottom: 9, marginTop: 4 }}>
                Get Insights
            </Button>

            <ClearButton />
        </div >
    )
}

export default SearchModule

