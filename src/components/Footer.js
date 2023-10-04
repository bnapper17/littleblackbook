import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const userName = user.email.split('@')[0];

    const handleClick = () => {
        logout();
    }

    return ( 
        <div className="footer">
            <div className="user-container">
                <p className="user">{userName}</p>
                {user && <button className='logout' onClick={handleClick}>logout</button>}
            </div>
            <Link to='/archive' className='material-symbols-outlined'>Archive</Link>
        </div>
     );
}
 
export default Footer;