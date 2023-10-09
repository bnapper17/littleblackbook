import { createContext, useReducer } from "react";


export const ClientContext = createContext();

export const clientReducer = (state, action) => {
    switch(action.type) {
        // Get all clients
        case "GET_CLIENTS" :
            return{
                clients: action.payload
            }
        // Get client details
        case "GET_DETAILS" :
            return{
                clients: action.payload
            }         
        // Create a new client
        case "CREATE_CLIENT" :
            return{
                clients:[action.payload, ...state.clients]
            }
        // Update current client
        case "UPDATE_CLIENT" :
            return{
                clients: action.payload
            }
        // Delete client
        case "DELETE_CLIENT" :
            return{
                clients: null
            }
        case "DELETE_CLIENT_LISTING" :
            return{
                clients: state.clients.filter(client => client._id !==action.payload._id)
            }
        // Archive client
        case "ARCHIVE_CLIENT" :
            return{
                clients: state.clients.filter(client => client._id !== action.payload._id)
            }
        default :
             return state

    }
};

export const ClientContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(clientReducer, {clients: null});

    return(
        <ClientContext.Provider value={{...state, dispatch}}>
            {children}
        </ClientContext.Provider>
    )
}