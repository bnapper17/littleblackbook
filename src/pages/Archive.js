import Clients from '../components/Clients';
import { useClientContext } from '../hooks/useClientContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react'


const Archive = () => {
    const { clients, dispatch } = useClientContext();
    const { user } = useAuthContext();


    useEffect(() => {

        const fetchArchivedClients = async () => {
            const response = await fetch('https://littleblackbook-api.onrender.com/api/clients/archive', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                mode: 'cors'
            });
            const json = await response.json();
            
            if(response.ok) {
                dispatch({type:"GET_CLIENTS", payload: json});
                console.log(json);
            }
        }
        if(user) {
            fetchArchivedClients();      
        }

    }, [dispatch, user]);

    return ( 
        <div className="home-container">
            <div className="client-container">
                {clients && clients.length > 0 && clients.map((client) => (
                    <Clients key={client._id} client={client} />
                ))}
            </div>
        </div>
     );
}
 
export default Archive;