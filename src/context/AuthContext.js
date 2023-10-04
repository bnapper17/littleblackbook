import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        // Login user
        case 'LOGIN': 
            return { user: action.payload };
        //Logout user
        case 'LOGOUT': 
            return { user: null };
        
        default: 
            return state
    }
}
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, []);

    console.log('AuhtContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}