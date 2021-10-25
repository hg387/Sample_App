import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { VenuesInfo } from '../components/VenuesInfo';
import { SearchBox } from '../components/SearchBox';
import { MyMap } from '../components/MyMap';
import styles from '../styles/Home.module.css';

const coordsInitial = [39.95, -75.16];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home({ response }) {
  // var VenuesList = response.response.venues

  const [selected, setSelected] = useState(null);
  const [userInputText, setUserInputText] = useState('');
  const [VenuesList, setVenuesList] = useState(response.response.venues);
  const [latLngMap, setLatLngMap] = useState(coordsInitial);

  return (
    <div>
      <div className={styles.search}>
        <SearchBox userData={userInputText} setUserData={setUserInputText} />
        <div className={styles.infoBar}>
          <VenuesInfo
            VenuesList={VenuesList}
            setVenuesList={setVenuesList}
            setLatLngMap={setLatLngMap}
            VenuesInit={VenuesList}
            userInputText={userInputText}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>

      <MyMap
        selected={selected}
        latLngMap={latLngMap}
        markers={VenuesList}
        setMarkers={setVenuesList}
        setSelected={setSelected}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const testForsquare = await fetch('http://localhost:3000/api/venues');

  const response = await testForsquare.json();

  return {
    props: { response },
  };
};
