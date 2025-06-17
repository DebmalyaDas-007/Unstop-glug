import { createContext,useState } from "react";

export const MainContext=createContext();

export const MainProvider=({children})=>{
    const [buttonTitle, setButtonTitle] = useState("profile");
    console.log(buttonTitle);
    
    return(
        <MainContext.Provider value={{buttonTitle,setButtonTitle}}>
            {children}
        </MainContext.Provider>
    )
}