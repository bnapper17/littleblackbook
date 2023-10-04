import { useClientContext } from "../hooks/useClientContext";
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input/input'

const ClientForm = () => {
    const { user } = useAuthContext();
    const { dispatch } = useClientContext();
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [bid, setBid] = useState(0);
    const [emergency, setEmergency] = useState(false);
    const [contract, setContract] = useState(false);
    const [archived, setArchived] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if(!name || !contact) {
            setError('Must provide a name and Phone Number')
            return;
        }

        const client = {name, contact, address, description, bid, emergency, contract, archived}

        const response = await fetch('https://littleblackbook-api.onrender.com/api/clients', {
            method: 'POST',
            body: JSON.stringify(client),
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            mode: 'cors'
        })

        const json = await response.json();
        
        if(!response.ok){
            setError('Something went wrong')
        }
        if(response.ok){
            setName('');
            setContact('');
            setAddress('');
            setDescription('');
            setBid(0);
            setEmergency(false);
            setContract(false);
            setArchived(false);
            setError(null);
            console.log('new client added successfully', json)

            dispatch({type: "CREATE_CLIENT", payload: json})
        }
    }

    return ( 
        <form className="client-form" onSubmit={handleSubmit}>

            <label className="col-span-2">Client Name:</label>
            <input 
            type="text" 
            onChange={e => setName(e.target.value)}
            value={name}
            className="col-span-3" 
            />

            <label className="col-span-2">Phone Number:</label>

            <PhoneInput
            country= "US"
            value={contact}
            onChange={setContact}
            className= "col-span-3"
            />

            <label className="col-span-2">Address:</label>
            <input 
            type="text"
            onChange={e => setAddress(e.target.value)}
            value={address}
            className="col-span-3"
            />

            <label>Job Description:</label>
            <input 
            type="text-area"
            onChange={e => setDescription(e.target.value)}
            value={description}
            className="col-span-3"
            />

            <label className="bid-label">Bid Amount:</label>
            <input 
            type="number"
            step="any"
            onChange={e => setBid(e.target.value)}
            value={bid}
            className="col-span-3"
            />

            <label className="emergency-label">Emergency Job:</label>
            <input 
            type="checkbox"
            onChange={e => setEmergency(e.target.checked ? true : false)}
            value={emergency}
            className="checkbox"
            />

            <label className="contract-label">Contract on File:</label>
            <input 
            type="checkbox"
            onChange={e => setContract(e.target.checked ? true : false)}
            value={contract}
            className="checkbox"
            />
            <button className="add-client">Add New Client</button>
            
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default ClientForm;