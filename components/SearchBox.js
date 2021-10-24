import React, { useState } from 'react'
import SearchBar from "material-ui-search-bar";

export const SearchBox = ({userData, setUserData}) => {

    const [tmpData, setTmpData] = useState(userData)
    const handleEnterSubmit = (text) => {
        //console.log(text)
        setUserData(tmpData)
        console.log(userData)
    }

    return (
        <SearchBar
        value={tmpData}
        cancelOnEscape={true}
        onChange={(newValue) => setTmpData(newValue)}
        onRequestSearch={() => handleEnterSubmit(userData)}
        onKeyPress={(ev) => {
            //console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === 'Enter') {
              // Do code here
              handleEnterSubmit(tmpData)
              ev.preventDefault();
            }
          }}
      />
    )
}

export default {SearchBox}
