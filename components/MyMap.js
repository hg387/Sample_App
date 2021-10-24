import React from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../public/mapStyles";

const libraries = ["places"]

const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

const meters = -3000

const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

  const redSvgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "red",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

var coef = meters * 0.0000089

export const MyMap = ({selected, latLngMap, markers, setMarkers, setSelected}) => {
      
    const center = {
        lat: latLngMap[0],
        lng: latLngMap[1],
    };

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
      });

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div>
            <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
          {(markers)
          ? markers.map((venue) => (
            <Marker
            key={venue.id}
            position={{ lat: venue.location.lat, lng: venue.location.lng }}
            onClick={() => {
                setSelected(venue);
            }}
            />
          ))
          :<></>}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.location.lat, lng: selected.location.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
            visible={() =>{selected?true:false}}
          >
            <div>
              <h8>
                {selected.name}
              </h8>
              <p>{selected.location.address}</p>
            </div>
          </InfoWindow>
        ) : <></>}       


        
      </GoogleMap>
            
        </div>
    )
}