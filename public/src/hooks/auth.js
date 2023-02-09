import { createContext, useContext, useState } from "react";


const authContext = createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const initialState = { auth, setAuth }
    return <authContext.Provider value={initialState}>{children}</authContext.Provider>
}

export default function  useAuth() {
    return useContext(authContext);
}