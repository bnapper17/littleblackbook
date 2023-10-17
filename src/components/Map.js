import { useMemo, useRef } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useClientContext } from '../hooks/useClientContext';

const Map = () => {
    const { clients } = useClientContext();
    const center = useMemo(() => ({lat: 38.3345, lng: -86.4641}), []);
    const marker = useRef();
    
   
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const getLocation = (e) => {
        marker.current = e.target
        const location = markers[0].props.position
        console.log(location, marker);
    }

    const markers = clients.map((client) => (
        <MarkerF key={client._id} position={client.geolocation} optimized={false} onClick={getLocation} >
            <InfoWindowF position={client.geolocation}>
                <h2>{client.name}</h2>
            </InfoWindowF>
        </MarkerF>
    ))

    if(isLoaded) return (
        <GoogleMap 
        zoom={9} 
        center={center} 
        mapContainerClassName='map-container'
        options={{
            disableDefaultUI: true,
            // clickableIcons: false
        }}
        >
            {clients && clients.length > 0 && markers}
        </GoogleMap>

    )

    if(!isLoaded) return <div className="loading">Loading...</div>

}

export default Map;