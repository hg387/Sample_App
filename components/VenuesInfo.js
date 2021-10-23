import React, { useEffect } from 'react'
import { useState } from 'react';
import useSWR from 'swr'
import { VenueInfo } from './VenueInfo';

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


export const VenuesInfo = ({VenuesInit}) => {
    const [Located, setLocated] = useState(false)
    const [Lat, setLat] = useState(39.95)
    const [Lng, setLng] = useState(-75.16) 
    const [VenuesList, setVenuesList] = useState(VenuesInit)

    const locate = async() => {
        const coord = await navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude)
                setLng(position.coords.longitude)
                setLocated(true)
                fetchVenues()
              return({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => {
                setLat(39.95)
                setLng(-75.16)

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
       
        console.log(newResponse.response.venues)
        
        setVenuesList(newResponse.response.venues)
    }
    
    useEffect(async () => {
        const locationCords = await locate()
    }, [])
    
    return (
        <div>
            {VenuesList.map(venue =>
                <VenueInfo  key={venue.id} venue={venue}/>
            )}  
        </div>
    )
}



export default {VenuesInfo}

