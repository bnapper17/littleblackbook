import { useClientContext } from "../hooks/useClientContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState} from 'react';
import { Link, useLocation } from  'react-router-dom';

const Header = () => {
    const { clients } = useClientContext();
    const { user } = useAuthContext();
    const [show, setShow] = useState(true);
    const { pathname } = useLocation();

    const handleClick = (e) => {
        e.preventDefault();

        const form = document.getElementsByClassName("mobile-form")[0];
        const button = e.target;
        setShow(!show);

        form.style.left = show ? "0%" : "100%";
        button.style.transform = show ? "rotate(45deg)" : "rotate(0deg)";
    }

    return ( 
        <header>
            <h1>{pathname === '/archive' ? 'COMPLETED' : 'CLIENTS'}</h1>
            {user && clients && <Link to='/' className="job-total"><span className="open-jobs">{pathname !== '/archive' && clients.length}</span> Open {clients.length === 1 ? "Job" : "Jobs"}</Link>}
            {user && pathname === '/' && <button
            type="button" 
            className="material-symbols-outlined add"
            onClick = {handleClick}
            >add</button>}
            {!user && <div className="sign-in">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                      </div>}
        </header>
     );
}
 
export default Header;