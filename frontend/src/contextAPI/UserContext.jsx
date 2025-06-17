import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const userContext=createContext();

export const UserProvider=({children})=>{

const [userData,setUserData]=useState({});
useEffect(()=>{
    ;(async()=>{
        const response = await axios.get('http://localhost:3000/api/auth/get-user', { 
            withCredentials: true 
          });
          if (response.data && response.data.user) {
            setUserData(response.data.user);
          }
    })()
},[])
return(
    <userContext.Provider value={userData}>
        {children}
    </userContext.Provider>   
)
}