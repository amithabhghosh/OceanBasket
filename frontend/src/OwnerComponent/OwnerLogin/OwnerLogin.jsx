import React, { useState } from 'react'
import "./OwnerLogin.css"
import { loginOwner } from '../../api/owner'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
export const OwnerLogin = () => {
    const navigate = useNavigate()
    const [phone,setPhone] = useState("")
    const [password,setPassword] = useState("")

const handleLoginOwner = (e)=>{
    e.preventDefault()
if(!password.trim() || !phone.trim()){
        return toast.error("Fill the Form")
    }
    mutate({phone,password})
}


const {mutate,isPending,isSuccess,isError,error} = useMutation({
    mutationFn:loginOwner,
    onSuccess:(data)=>{
        localStorage.setItem("ownerToken",data.token)
        localStorage.setItem("ownerRefreshToken",data.refreshToken)
    console.log(data.token)
    toast.success("Login Success")
    navigate("/ownerDashboard")

    },
    onError:(err)=>{
        toast.error('Login error:', err.response?.data?.message || err.message)
    }
})
  return (
  <section className="ownerLoginMainSection">
        <div className="ownerMainDiv">
            <div className="ownerMainTextDiv">
                <h1>Welcome</h1>
                <p>Sign in to grow your journey</p>
            </div>
            <div>
                <form action="" className="ownerFormTag" onSubmit={handleLoginOwner}>
                    <div className="ownerLoginDetailsDiv">
                        <div className="ownerPhoneNumberDiv">
                            <label htmlFor="">Phone Number</label>
                            <input placeholder="Enter your phone number" className="ownerPhoneNumberInputTag" type="tel" name="" id="" onChange={(e)=>setPhone(e.target.value)} value={phone}/>
                            <i id="phoneicon" class="fa-solid fa-phone"></i>
                        </div>
                        <div className="ownerPasswordDiv">
                            <label htmlFor="">Password</label>
                            <input placeholder="Enter your password" className="ownerPasswordInputTag" type="password" name="" id="" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                            <i id="passwordicon" class="fa-solid fa-lock"></i>
                        </div>
                    </div>
                    <div className="ownerCheckBoxMainDiv">
                        <div className="ownerCheckBoxinputDiv">
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Remember me</label>
                        </div>
                        <a className="ownerForgotPasswordTag" href="">Forgot Password?</a>
                    </div>
                    <div className="ownerSignInDiv">
                        <button className="ownerSignInButton" type="submit" disabled={isPending} >{isPending ? <FaSpinner className="spin" /> : "Sign In"}</button>
                    </div>
                </form>
            </div>
        </div>
     </section>
  )
}
