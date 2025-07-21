import React, { useContext, useEffect, useState } from 'react'
import { getDefaultPincode } from './getDefaultPincode';
import { PincodePopup } from './CustomerComponents/PincodePopup/PincodePopup';
import { toast } from 'react-toastify';
import { ContextAPI } from './Context/ContextAPI';

export const PincodeManager = ({children}) => {
    const {zipCode,setZipCode} = useContext(ContextAPI)
    const [showPopUp,setShowPopUp] = useState(false)
    useEffect(()=>{
        const pincode = getDefaultPincode();
       
        if(!pincode && !zipCode ){
setShowPopUp(true)
        }else if(pincode){
            localStorage.setItem("zipCode",pincode)
            setZipCode(pincode)
        }
    },[])

const handlePincodeSubmit = (enteredPincode)=>{
localStorage.setItem("zipCode",enteredPincode)
setZipCode(enteredPincode)
toast.success("ZipCode Set SuccessFully")
setShowPopUp(false);
}

  return (
    <>
      {showPopUp && <PincodePopup onSubmit={handlePincodeSubmit} />}
      {children}
    </>
  )
}
