import { useClientContext } from '../hooks/useClientContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {format} from 'date-fns';
import { formatPhoneNumber } from 'react-phone-number-input';
import EditClient from './EditClient';

const ClientDetails = () => {
    const { user } = useAuthContext();
    const {clients, dispatch} = useClientContext();
    const {id} = useParams();
    const navigate = useNavigate();
    const dollar = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})

    const handleClick = (e) => {
        const form = document.getElementsByClassName("edit-client-form")[0];

        if(e.target.className === "edit-client-form") {
            form.style.left = "100%";
            form.style.display = "hidden";
        }
        
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const form = document.getElementsByClassName("edit-client-form")[0];
        form.style.left = "0%";

    }

    const handleDelete = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/clients/' + clients._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`   
            }
        });

        const json = await response.json();

        if(response.ok) {
            dispatch({type: 'DELETE_CLIENT', payload: json});
            navigate('/');
        };
        
    };
    
    useEffect(() => {

        const fetchDetails = async () => {
            const response = await fetch('https://littleblackbook-api.onrender.com/api/clients/' + id, {
                headers : {
                    'Authorization': `Bearer ${user.token}`
                },
                mode: 'cors'
            });
            const json = await response.json();
            
            if(response.ok) {
                dispatch({type: "GET_DETAILS", payload: json});
            }
        }
        if(user){
            fetchDetails();
        }

    }, [dispatch, id, user])
        

    return ( 
        <div className="client-details-container">
            {clients && 
            <div className="client-details">
                <h2 className="name">{clients.name}</h2>
                <p className="contact"><a href={'tel:' + clients.contact}>{formatPhoneNumber(clients.contact)}</a></p>
                <p className="address">{clients.address ? clients.address : 'No Address Recorded'}</p>
                <p className="description">{clients.description ? clients.description : 'No Job Description Given'}</p>
                <p className="bid"><span>Bid: </span>{dollar.format(clients.bid)}</p>
                <p className="emergency">{clients.emergency ? "Emergency" : "Not an emergency"}</p>
                <p className="contract">{clients.contract ? "Contract on file" : "No Contract on File"}</p>
                { clients.createdAt && <p className="created">{format(new Date(clients.createdAt), "MM/dd/yy 'at' h:mm b")}</p>}
                <button className='edit-button' onClick={handleEdit}>Edit Client</button>
                <button className='delete-button' onClick={handleDelete}>Delete</button>
            </div>
            }
            <div className="edit-client-form" onClick={handleClick}>
                {clients && <EditClient/>}
            </div>
        </div>
     );
}
 
export default ClientDetails;