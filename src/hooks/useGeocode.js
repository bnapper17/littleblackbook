import { setKey, fromAddress } from 'react-geocode';

export const useGeocode = () => {
    
    const geoCode = async (address) => {
        setKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
        
        const locationInfo = await fromAddress(address)
        const geoLocation = locationInfo.results[0].geometry.location;

        return geoLocation;
    }

    return { geoCode }
}

