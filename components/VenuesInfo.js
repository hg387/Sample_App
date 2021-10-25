import React, { useEffect, useState } from 'react';
import {server} from '../config/'
import Skeleton from '@mui/material/Skeleton';
import { VenueInfo } from './VenueInfo';

export const VenuesInfo = ({
  VenuesList,
  VenuesInit,
  userInputText,
  setLatLngMap,
  setVenuesList,
  selected,
  setSelected,
}) => {
  const [Located, setLocated] = useState(false);
  const [Lat, setLat] = useState(39.95);
  const [Lng, setLng] = useState(-75.16);
  const [isLoading, setLoading] = useState(false);

  const fetchQueryVenues = async () => {
    setLoading(true);
    const newVenues = await fetch(
      `${server}/api/venues/${Lat}/${Lng}/${userInputText}`
    );
    const newResponse = await newVenues.json();

    if (newResponse.meta.code !== 200){
      return; 
    }

    if (!newResponse.response.venues){
      setVenuesList([]);
      setLoading(false);
      return;
    }

    //console.log(newResponse.response.venues);

    setVenuesList(newResponse.response.venues);
    setLoading(false);
  };

  const startSearch = useEffect(async () => {
    if (userInputText) {
      //console.log('in callback');
      const response = await fetchQueryVenues();
    }
  }, [userInputText]);

  const fetchVenues = async () => {
    const newVenues = await fetch(
      `${server}/api/venues/${Lat}/${Lng}/`
    );
    const newResponse = await newVenues.json();

    // console.log(newResponse.response.venues)

    if (newResponse.meta.code !== 200){
      return; 
    }

    setVenuesList(newResponse.response.venues);
  };

  const locate = async () => {
    const coord = await navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setLocated(true);
        setLatLngMap([Lat, Lng]);
        fetchVenues();
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      () => {
        setLat(39.95);
        setLng(-75.16);
        setLatLngMap([Lat, Lng]);
        return {
          lat: 39.95,
          lng: -75.16,
        };
      }
    );

    return coord;
  };

  useEffect(async () => {
    setLoading(true);
    const locationCords = await locate();
    setLoading(false);
  }, []);

  // console.log("fetched Info")

  return (
    <>
      {isLoading || !VenuesList ? (
        <Skeleton animation="wave" />
      ) : (
        VenuesList.map((venue) => (
          <VenueInfo
            key={venue.id}
            venue={venue}
            setSelected={setSelected}
            selected={selected}
          />
        ))
      )}
    </>
  );
};

export default { VenuesInfo };
