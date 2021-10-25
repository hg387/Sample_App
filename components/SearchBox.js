import React, { useState } from 'react';
import SearchBar from 'material-ui-search-bar';

export const SearchBox = ({ userData, setUserData }) => {
  const [tmpData, setTmpData] = useState(userData);
  const handleEnterSubmit = (text) => {
    // console.log(text)
    setUserData(tmpData);
    console.log(userData);
  };

  return (
    <SearchBar
      style={{ padding: 0, fontSize: 5 }}
      value={tmpData}
      cancelOnEscape
      onChange={(newValue) => setTmpData(newValue)}
      onRequestSearch={() => handleEnterSubmit(userData)}
      onKeyPress={(ev) => {
        // console.log(`Pressed keyCode ${ev.key}`);
        if (ev.key === 'Enter') {
          handleEnterSubmit(tmpData);
          ev.preventDefault();
        }
      }}
    />
  );
};

export default { SearchBox };
