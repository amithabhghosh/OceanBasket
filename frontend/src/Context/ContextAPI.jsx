import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import API from "../connectApi";
export const ContextAPI = createContext();

const ContextProvider = ({children})=>{

    const [zipCode, setZipCode] = useState(localStorage.getItem("zipCode") || "");
   
    return(
        <ContextAPI.Provider value={{zipCode,setZipCode}}>
{children}
        </ContextAPI.Provider>
    )
}
export default ContextProvider