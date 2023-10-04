import {ClientContext} from '../context/ClientContext';
import {useContext} from 'react';

export const useClientContext = () => {
    const context = useContext(ClientContext);

    if(!context){
        throw Error('Not within the scope of the client context');
    }

    return context
}