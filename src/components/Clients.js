import { useClientContext } from '../hooks/useClientContext';
import { useAuthContext } from '../hooks/useAuthContext';
import{ Link } from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns';
import { formatPhoneNumber } from 'react-phone-number-input';

const Clients = ({client}) => {
    const { user } = useAuthContext();
    const { dispatch } = useClientContext();
    const dollar = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})

     
    
    const handleArchive = async () => {

        client.archived = true;

        const response = await fetch('/api/clients/' + client._id, {
            method: 'PATCH',
            body: JSON.stringify(client),
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(response.ok) {
            dispatch({type:"UPDATE_CLIENT", payload: json});
        }
    }



    return ( 
        <div 
        className={client.emergency ? 'client emergency' : 'client'}
        key={client._id}
        >
            <h3 className='name'><Link to={`/api/clients/${client._id}`}>{client.name}</Link>{client.contract && <span className="material-symbols-outlined check">check</span>}</h3>
            {client.contact && <p className='contact'><a href={'tel:' + client.contact}>{formatPhoneNumber(client.contact)}</a></p>}
            {client.address && <p className="address details">{client.address}</p>}
            {client.description && <p className="description details">{client.description}</p>}
            {client.bid > 0 && <p className="bid details"><span>Bid: </span>{dollar.format(client.bid) }</p>}
            <p className="contract details">{client.contract ? 'Contract' : 'No Contract'}</p>
            <p className='created'>{formatDistanceToNow(new Date(client.createdAt), {addSuffix: true})}</p>
            <button 
            className='material-symbols-outlined'
            onClick={handleArchive}
            >Archive</button>
        </div>
     );
}
 
export default Clients;