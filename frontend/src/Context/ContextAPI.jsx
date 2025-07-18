import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import API from "../connectApi";
export const ContextAPI = createContext();

const ContextProvider = ({children})=>{

   
    return(
        <ContextAPI.Provider value={{}}>
{children}
        </ContextAPI.Provider>
    )
}
export default ContextProvider