import { useClientContext } from '../hooks/useClientContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useLocation } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { formatPhoneNumber } from 'react-phone-number-input';

const Clients = ({client}) => {
    const { user } = useAuthContext();
    const { dispatch } = useClientContext();
    const { pathname } = useLocation();
    const dollar = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})

     
    const openMenu = (e) => {
        const modal = e.target.nextElementSibling;
        modal.style.opacity = 1;
        modal.style.pointerEvents = 'all';
        modal.style.height = '100%';
    }

    const closeModal = (e) => {
        const modal = e.target
        if(e.target.id === 'modal') {
        modal.style.opacity = 0;
        modal.style.pointerEvents = 'none';
        modal.style.height = '0%';
        } else {
            return
        }
    }


    const handleArchive = async () => {

        const response = await fetch('https://littleblackbook-api.onrender.com/api/clients/' + client._id, {
            method: 'PATCH',
            body: JSON.stringify({archived: true}),
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            mode: 'cors'
        })

        const json = await response.json();

        if(response.ok) {
            dispatch({type:"ARCHIVE_CLIENT", payload: json});
            console.log(client);
        }
    }

    const handleDelete = async () => {

        const response = await fetch('https://littleblackbook-api.onrender.com/api/clients/' + client._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`   
            },
            mode: 'cors'
        });

        const json = await response.json();

        if(response.ok) {
            dispatch({type: 'DELETE_CLIENT_LISTING', payload: json});
        };
        
    };

    const handleSelect = (e) => {
        const completeButton = document.getElementById('complete');
        const deleteButton = document.getElementById('delete');

        if(e.target.id === 'complete') {
            e.target.style.backgroundColor = 'green';
            e.target.style.color = 'var(--primary)'
            e.target.classList.add('selected')
            deleteButton.style.backgroundColor = 'transparent'
            deleteButton.style.color = 'red';
            deleteButton.classList.remove('selected');
        }
        if(e.target.id === 'delete') {
            e.target.style.backgroundColor = 'red';
            e.target.style.color = 'var(--primary)';
            e.target.classList.add('selected');
            completeButton.style.backgroundColor = 'transparent';
            completeButton.style.color = 'green';
            completeButton.classList.remove('selected');
        }

    }

    const handleConfirm = (e) => {
        if(e.target.id === 'complete') {
            handleArchive();
            e.target.classList.remove('selected');
        }
        if(e.target.id === 'delete') {
            handleDelete();
        }
    };

    const getDirections = (e) => {
        const location = e.target.id;


        if(/iphone|ipad/i.test(navigator.userAgent)) {
            window.location.href = '//maps.apple.com/?q=' + location
        }
        else{
            window.location.href = '//maps.google.com/?q=' + location
        }
        console.log(location)
    }

    return ( 
        <div 
        className={client.emergency ? 'client emergency' : 'client'}
        key={client._id}
        >
            <h3 className='name'><Link to={`/api/clients/${client._id}`}>{client.name}</Link>{client.contract && <span className="material-symbols-outlined check">check</span>}</h3>
            {client.contact && <p className='contact details'>{formatPhoneNumber(client.contact)}</p>}
            {client.address && <p className="address details" onClick={getDirections}>{client.address}</p>}
            {client.description && <p className="description details">{client.description}</p>}
            {client.bid > 0 && <p className="bid details"><span>Bid: </span>{dollar.format(client.bid) }</p>}
            <p className="contract details">{client.contract ? 'Contract' : 'No Contract'}</p>
            <p className='created'>{formatDistanceToNow(new Date(client.createdAt), {addSuffix: true})}</p>
            {pathname === '/' && <button 
            className='material-symbols-outlined'
            id='complete-menu-button'
            onClick={openMenu}
            >more_vert</button>}

            <div id="modal" 
            onClick={closeModal}
            >
                <button
                className='material-symbols-outlined' 
                id='complete' 
                onClick={(e) => {
                    if(e.target.classList.contains('selected')) {
                        handleConfirm(e);
                    }
                    else {
                        handleSelect(e);
                    }
                }}>done_outline</button>

                <button 
                className='material-symbols-outlined'
                id='delete'
                onClick={(e) => {
                    if(e.target.classList.contains('selected')) {
                        handleConfirm(e);
                    }
                    else {
                        handleSelect(e);
                    }
                }}>delete_forever</button>

                <button 
                className="material-symbols-outlined directions" 
                id={client.address}
                onClick={getDirections}
                >directions</button>

                <a href={'tel:' + client.contact}>
                    <button 
                    className="material-symbols-outlined call" 
                    id={client.address}
                    onClick={getDirections}
                    >call</button>
                </a>
            </div>
        </div>
     );
}
 
export default Clients;