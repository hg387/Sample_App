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


var coef = meters * 0.0000089

export const MyMap = ({latLngMap, markerList}) => {
    const [markers, setMarkers] = React.useState(markerList);
      
    const center = {
        lat: latLngMap[0] + coef,
        lng: latLngMap[1] + (coef / Math.cos(latLngMap[0] * 0.030)),
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
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        
      </GoogleMap>
            
        </div>
    )
}