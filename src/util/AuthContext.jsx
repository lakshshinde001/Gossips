import {useContext, useState, useEffect, createContext, Children} from 'react'
import {account} from '../appwrite/appwriteConfig';
import {useNavigate} from 'react-router-dom';

const authContext = createContext();

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error(error)
        }
        setLoading(false);
    }
    useEffect(() => {
        getUserOnLoad();
    }, [])

    const contextData = {
        user
    }
    
    return (
        <authContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
}
export default authContext;


