import { useClientContext } from "../hooks/useClientContext";
import { useAuthContext } from "../hooks/useAuthContext";
import PhoneInput from 'react-phone-number-input/input'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const EditClient = () => {
    const { user } = useAuthContext();
    const {clients, dispatch} = useClientContext();
    const navigate = useNavigate();
    const [name, setName] = useState(clients.name);
    const [contact, setContact] = useState(clients.contact);
    const [address, setAddress] = useState(clients.address);
    const [description, setDescription] = useState(clients.description);
    const [bid, setBid] = useState(clients.bid);
    const [emergency, setEmergency] = useState(clients.emergency);
    const [contract, setContract] = useState(clients.contract);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user) {
            return
        }

        const client = {name, contact, address, description, bid, emergency, contract}

        const response = await fetch('https://littleblackbook-api.onrender.com/api/clients/' + clients._id, {
            method: 'PATCH',
            body: JSON.stringify(client),
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();
        
        if(!response.ok){
            throw Error('Something went wrong');
        }

        if(response.ok) {
            console.log(clients._id, json);
            dispatch({type: 'UPDATE_CLIENT', payload: json})
            navigate("/")
        }
    }

    useEffect(() => {
        setName(clients.name);
        setContact(clients.contact)
        setAddress(clients.address)
        setDescription(clients.description)
        setBid(clients.bid)
        setEmergency(clients.emergency)
        setContract(clients.contract)
    },[clients])

    return ( 
        <form className="client-form" onSubmit={handleSubmit}>

            <label className="col-span-2">Client Name:</label>
            <input 
            type="text" 
            onChange={e => setName(e.target.value)}
            defaultValue={name ? name : ''}
            className="col-span-3"
            required 
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
            defaultValue={address? address : ''}
            className="col-span-3"
            />

            <label>Job Description:</label>
            <input 
            type="text-area"
            onChange={e => setDescription(e.target.value)}
            defaultValue={description ? description : ''}
            className="col-span-3"
            />

            <label className="bid-label">Bid Amount:</label>
            <input 
            type="number"
            step="any"
            onChange={e => setBid(e.target.value)}
            defaultValue={bid ? bid : ''}
            className="col-span-3"
            />

            <label className="emergency-label">Emergency Job:</label>
            <input 
            type="checkbox"
            onChange={e => setEmergency(e.target.checked ? true : false)}
            checked={emergency ? emergency : false}
            className="checkbox"
            />

            <label className="contract-label">Contract on File:</label>
            <input 
            type="checkbox"
            onChange={e => setContract(e.target.checked ? true : false)}
            checked={contract ? contract : false}
            className="checkbox"
            />
            <button className="add-client">Update</button>
        </form>
     );
}
 
export default EditClient;