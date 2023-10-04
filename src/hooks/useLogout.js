import { useAuthContext } from "./useAuthContext";
import { useClientContext } from "./useClientContext";


export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: clientDispatch } = useClientContext();

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');

        //dispatch a logout action
        dispatch({type: 'LOGOUT'})
        clientDispatch({type: 'GET_CLIENTS', payload: null})

    }

    return {logout}
}