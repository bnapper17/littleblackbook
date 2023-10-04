import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Email:</label>
            <input 
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            className="col-span-3" 
            />

            <label>Password:</label>
            <input 
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="col-span-3"
            id="password"  
            />
            
            <label>Confirm:</label>
            <input 
            type="password"
            className="col-span-3"
            id="confirm"  
            />

            <button disabled={isLoading}>Sign Up</button>

            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup