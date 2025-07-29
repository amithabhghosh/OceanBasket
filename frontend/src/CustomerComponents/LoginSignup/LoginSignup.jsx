import React, { useEffect } from 'react'
import "./LoginSignup.css"
import { FaUser, FaPhone, FaUserCircle } from 'react-icons/fa';
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import {loginCustomer} from "../../api/auth"
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
export const LoginSignup = () => {
const navigate = useNavigate()
const [signUp,setSignUp] = useState("signup")
const [otpSent,setOtpSent] = useState(false)
 const [timeLeft, setTimeLeft] = useState();
  const [buttonLabel, setButtonLabel] = useState("Get OTP");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
const [isOtpVerified,setisOtpVerified] = useState(false)
const [showPassword,setShowPassword] = useState(false)
const [phoneNumber,setPhoneNumber] = useState("")
const [password,setPassword] = useState("")

const confirmOtp = async ()=>{
    try {
        //Verify Otp Code

        setisOtpVerified(true)
    } catch (error) {
        console.log(error)
    }
}

const startTimer =()=>{
setTimeLeft(30)
setIsButtonDisabled(true)
}

useEffect(()=>{
let timer;
  if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsButtonDisabled(false);
      setButtonLabel("Resent OTP");
    }
    return () => clearInterval(timer);
},[timeLeft])

const SentOtp = async ()=>{
    try {

        //Api Call For Otp Sent
setOtpSent(true)
startTimer() 
    } catch (error) {
        console.log(error)
    }
}

const loginToAccount = ()=>{
    if(!password.trim() || !phoneNumber.trim()){
        return toast.error("Fill the Form")
    }
    mutate({phoneNumber,password})
}

const {mutate,isPending,isSuccess,isError,error} = useMutation({
    mutationFn:loginCustomer,
    onSuccess:(data)=>{
        localStorage.setItem("userToken",data.token)
        localStorage.setItem("userRefreshToken",data.refreshToken)
        localStorage.setItem("user", JSON.stringify(data.user));
    toast.success("Login Success")
    navigate("/dashboard")

    },
    onError:(err)=>{
        toast.error('Login error:', err.response?.data?.message || err.message)
    }
})


  return (
    <>
  {signUp === "signup" ? (
<div className='mainSignUpContainer'>
<div className="createAccountIconSet">
<ion-icon name="person-circle-outline" className="Usericon"></ion-icon>
<div className="createAccountSectionDetails">
<div className="creatAccountContentsDetails">
<h2>Create your </h2>
     <h2 >account</h2>
</div>


{
    isOtpVerified ? (
        <>
 <div className='setPasswordMobileSection'>

           <div className="signUpMobileFormName">
    <label htmlFor="name">Password</label>
        <div className="signUpMobileFormNameIcons">
<input type="text" id='name' className='signUpMobileFormNameInput'/>
<FaLock className="signUpMobileFormNameicon" />
        </div>   
    </div>


    <div className="signUpMobileFormPhone">
        <label htmlFor="phone">Confirm password</label>
        <div className="signUpMobileFormPhoneInput">
            <input type="tel" id='phone' className='signUpMobileFormPhoneInputBox'/>
                 <FaLock className="signUpMobileFormphoneicon" />
        </div>
    </div>


<div className="checkboxPassword">
    <div className="checkInsideBox">
<input type="checkbox" name="" id="checkbox" />
    <label htmlFor="checkbox">I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></label>
    </div>
    
</div>

<div className="signUpMobileFormGetOtpButton">
        <button>
        Create Account</button>
    </div>

        </div>
        </>
    ):(

<div className='signUpMobileForm'>
     <div className="signUpMobileFormName">
    <label htmlFor="name">Name</label>
        <div className="signUpMobileFormNameIcons">
<input type="text" id='name' className='signUpMobileFormNameInput'/>
<FaUser className="signUpMobileFormNameicon" />
        </div>   
    </div>


    <div className="signUpMobileFormPhone">
        <label htmlFor="phone">Phone number</label>
        <div className="signUpMobileFormPhoneInput">
            <input type="tel" id='phone' className='signUpMobileFormPhoneInputBox'/>
                 <FaPhone className="signUpMobileFormphoneicon" />
        </div>
    </div>

    <div className="signUpMobileFormGetOtpButton">
        <button  onClick={SentOtp}
        disabled={isButtonDisabled}
        style={{
         
          backgroundColor: isButtonDisabled ? "#ccc" : "#164863",
          color: isButtonDisabled ? "#666" : "#ddf2fd",
        }}
      >
        {isButtonDisabled ? `Resend ${timeLeft}s` : buttonLabel}</button>
    </div>
{
    otpSent?(
<div className="otpSection">
<p>Enter your OTP</p>
<div class="otp-container">
    <input type="text" maxLength="1" className="otp-input" />
    <input type="text" maxlength="1" className="otp-input" />
    <input type="text" maxlength="1" className="otp-input" />
    <input type="text" maxlength="1" className="otp-input" />
  </div>
  <div className="otpConfirmButton">
    <button onClick={confirmOtp}>Confirm</button>
  </div>
  
    </div>
    ): (null)
}


    </div>


    )
}




    <div className="createAccountContent" >
<p>Do you already have an account?</p>
    <span onClick={()=>setSignUp("login")}>Login</span>
    </div>
    
</div>
</div>



<div className="signUpFormSection">

{
    isOtpVerified ? (
        <>
        <div className='setPasswordSection'>

            <div className="signUpName">
    <label htmlFor="name">Password</label>
        <div className="signNameIcons">
<input type="password" id='name' className='signUpNameInput'/>
 <FaLock className='Nameicon' />
        </div>   
    </div>


    <div className="signUpPhone">
        <label htmlFor="phone">Confirm password</label>
        <div className="signUpPhoneInput">
            <input type="password" id='phone' className='signUpPhoneInputBox'/>
                 <FaLock className="phoneicon" />
        </div>
    </div>


<div className="checkboxPassword">
    <div className="checkInsideBox">
<input type="checkbox" name="" id="checkbox" />
    <label htmlFor="checkbox">I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></label>
    </div>
    
</div>

<div className="signUpGetOtpButton">
        <button>
        Create Account</button>
    </div>

        </div>
        </>
    ): (
<>

  <div className="signUpName">
    <label htmlFor="name">Name</label>
        <div className="signNameIcons">
<input type="text" id='name' className='signUpNameInput'/>
<FaUser className="Nameicon" />
        </div>   
    </div>


    <div className="signUpPhone">
        <label htmlFor="phone">Phone number</label>
        <div className="signUpPhoneInput">
            <input type="tel" id='phone' className='signUpPhoneInputBox'/>
                 <FaPhone className="phoneicon" />
        </div>
    </div>

    <div className="signUpGetOtpButton">
        <button onClick={SentOtp}
        disabled={isButtonDisabled}
        style={{
          
          backgroundColor: isButtonDisabled ? "#ccc" : "#164863",
          color: isButtonDisabled ? "#666" : "#ddf2fd",
        }}
      >
        {isButtonDisabled ? `Resend ${timeLeft}s` : buttonLabel}</button>
    </div>
    

    {
    otpSent?(
<div className="otpSection">
<p>Enter your OTP</p>
<div class="otp-container">
    <input type="text" maxlength="1" class="otp-input" />
    <input type="text" maxlength="1" class="otp-input" />
    <input type="text" maxlength="1" class="otp-input" />
    <input type="text" maxlength="1" class="otp-input" />
  </div>
  <div className="otpConfirmButton">
    <button onClick={confirmOtp}>Confirm</button>
  </div>
  
    </div>
    ): (null)
}


</>

    )
}
  
</div>


  </div>


  ) : (
 
    <div className='loginContainer'>
<div className="loginContainerDetails">

</div>

<div className="loginContainerForm">
    <div className="LoginWelcome">
        <h3>Welcome</h3>
        <p>Sign in to continue your journey</p>
    </div>
    <div className="loginInputs">
        <div className="loginPhoneInputs">
            <label htmlFor="phone">Phone Number</label>
            <div className="loginPhoneInputIcons">
<input type="tel" name="" id="phone" className='loginPhoneInputField' onChange={(e)=>setPhoneNumber(e.target.value)}/>
            <FaPhone className="loginPhoneIcon" />
            </div>
            
        </div>


          <div className="loginPasswordInputs">
            <label htmlFor="password">Password</label>
            <div className="loginPasswordInputIcons">
  <input type="password" name="" id="password" className='loginPasswordInputField' onChange={(e)=>setPassword(e.target.value)}/>
            <FaLock className="loginPasswordIcon" />
            </div>
          
        </div>


        <div className="loginRememberAndForgot">
            <div className='loginRemember'>
     <input type="checkbox" name="" id="remember" />
            <label htmlFor="remember">Remember me</label>
            </div>
       <p>Forgot Password?</p>
        </div>

        <div className="loginButton">
            <button onClick={loginToAccount} disabled={isPending} >
               {
                isPending ? (
 <FaSpinner className="spin" />
                )
               
                :(
"Sign In"
                )
              
               }
                
                </button>
        </div>

    </div>

    <div className="loginDownSections">
        <p>I don't have an account, <span onClick={()=>setSignUp("signup")}>Sign Up</span></p>
    </div>

</div>

    </div>

  )}
  
  </>
  )
}
