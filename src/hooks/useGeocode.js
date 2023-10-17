import { setKey, fromAddress } from 'react-geocode';

export const useGeocode = () => {
    
    const geoCode = async (address) => {
        setKey('AIzaSyAtyfghNNF2yljYpeg1n67qkodciewtKHs')
        
        const locationInfo = await fromAddress(address)
        const geoLocation = locationInfo.results[0].geometry.location;

        return geoLocation;
    }

    return { geoCode }
}

