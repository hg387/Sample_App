import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import useSWR from 'swr'
import { VenueInfo } from './VenueInfo';
import Skeleton from '@mui/material/Skeleton';

const locate = async() => {
    const coord = await navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position)
          return({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {return({
            lat: process.env.INITIAL_LAT,
            lng:  process.env.INITIAL_LNG,
          });
        }
      )

    return coord;
}


export const VenuesInfo = ({VenuesInit, userInputText, setLatLngMap}) => {
    const [Located, setLocated] = useState(false)
    const [Lat, setLat] = useState(39.95)
    const [Lng, setLng] = useState(-75.16) 
    const [VenuesList, setVenuesList] = useState(VenuesInit)
    const [isLoading, setLoading] = useState(false)

    const startSearch = useEffect(
      async () => {
        if (userInputText){
        console.log("in callback")
        const response = await fetchQueryVenues();   
      }
    },
      [userInputText],
    )

    const fetchQueryVenues = async() => {
      setLoading(true)
      const newVenues = await fetch(`http://localhost:3000/api/venues/${Lat}/${Lng}/${userInputText}`)
      const newResponse = await newVenues.json();
     
      console.log(newResponse.response.venues)
      
      setVenuesList(newResponse.response.venues)
      setLoading(false)
  }

    const locate = async() => {
        const coord = await navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude)
                setLng(position.coords.longitude)
                setLocated(true)
                setLatLngMap([Lat, Lng])
                fetchVenues()
              return({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => {
                setLat(39.95)
                setLng(-75.16)
                setLatLngMap([Lat, Lng])
                return({
                lat: 39.95,
                lng: -75.16,
              });
            }
          )
    
        return coord;
    }

    const fetchVenues = async() => {
     
        const newVenues = await fetch(`http://localhost:3000/api/venues/${Lat}/${Lng}/`)
        const newResponse = await newVenues.json();
       
        //console.log(newResponse.response.venues)
        
        setVenuesList(newResponse.response.venues)
    }
    
    useEffect(async () => {
        setLoading(true)
        const locationCords = await locate()
        setLoading(false)
    }, [])

    //console.log("fetched Info")
    
    return (
        <>
          {
            (isLoading || !VenuesList) 
            ? <Skeleton variant="rectangular" width='8vw' height='10vw' />
            :VenuesList.map(venue =>
              <VenueInfo  key={venue.id} venue={venue}/>
          )
          } 
        </>
    )
}



export default {VenuesInfo}

