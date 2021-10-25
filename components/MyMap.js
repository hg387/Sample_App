import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import mapStyles from '../public/mapStyles';

const libraries = ['places'];

const mapContainerStyle = {
  height: '100vh',
  width: '100vw',
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const meters = -3000;

const coef = meters * 0.0000089;

export const MyMap = ({
  selected,
  latLngMap,
  markers,
  setMarkers,
  setSelected,
}) => {
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

  if (loadError) return 'Error';
  if (!isLoaded) return 'Loading...';

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={18}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {markers ? (
          markers.map((venue) => (
            <Marker
              key={venue.id}
              position={{ lat: venue.location.lat, lng: venue.location.lng }}
              onClick={() => {
                setSelected(venue);
              }}
            />
          ))
        ) : (
          <></>
        )}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.location.lat,
              lng: selected.location.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
            visible={() => {
              !!(selected && selected.id === venue.id);
            }}
          >
            <div>
              <p>{selected.name}</p>
              <p>{selected.location.address}</p>
            </div>
          </InfoWindow>
        ) : (
          <></>
        )}
      </GoogleMap>
    </div>
  );
};

export default { MyMap };
