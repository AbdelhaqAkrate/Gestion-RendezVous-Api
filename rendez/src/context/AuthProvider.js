import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ components }) =>{
    const [auth,setAuth] = useState({});
    return(
        <AuthContext.Provider value={{auth, setAuth}} >
            {components}
        </AuthContext.Provider> 
    )

}

export default AuthContext;