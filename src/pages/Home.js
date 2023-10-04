import ClientForm from '../components/ClientForm';
import Clients from '../components/Clients';
import { useClientContext } from '../hooks/useClientContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react'


const Home = () => {
    const { clients, dispatch } = useClientContext();
    const { user } = useAuthContext();

    const handleClick = (e) => {
        const form = document.getElementsByClassName("mobile-form")[0];
        const button = document.getElementsByClassName("material-symbols-outlined")[0];

        if(e.target.className === "client-form" || e.target.className === "mobile-form") {
            form.style.left = "100%";
            form.style.display = "hidden";
            button.style.transform ="rotate(0deg)";
        }
        console.log(e.target.className)
        console.log(button);
   
        
    }

    useEffect(() => {

        const fetchClients = async () => {
            const response = await fetch('/api/clients', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            
            if(response.ok) {
                dispatch({type:"GET_CLIENTS", payload: json});
            }
        }
        if(user) {
            fetchClients();
        }

    }, [dispatch, user]);

    return ( 
        <div className="home-container">
            <div className="client-container">
                {clients && clients.length > 0 && clients.map((client) => (
                    <Clients key={client._id} client={client} />
                ))}
            </div>
            <div className="client-form-container">
                <ClientForm />
            </div>
            <div 
            className="mobile-form"
            onClick={handleClick}>
                <ClientForm />
            </div>
        </div>
     );
}
 
export default Home;