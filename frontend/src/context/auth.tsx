import {createContext, ReactNode} from 'react'
import useAuthUser from '../hooks/useAuthUser'

type UserContextType = {
    authenticate: boolean; 
    logout: () => void;
    login: () => void
};

const initialContext: UserContextType = {
    authenticate: false,
    logout: () => {},
    login: () => {}
}


const context = createContext<UserContextType>(initialContext)

export const ContextProvider = ({children}: { children: ReactNode })  => {

    const {authenticate, setAuthenticate} = useAuthUser()

    function logout(){
        setAuthenticate(false)
        localStorage.removeItem('token')
    }

    function login(){
        setAuthenticate(true)
    }

    return (
        <context.Provider value={{authenticate, logout, login}}>
            {children}
        </context.Provider>
    )
}

export default context