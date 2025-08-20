import React from 'react'
import "./AdminLogin.css"
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../../api/Admin'
export const AdminLogin = () => {
const navigate = useNavigate()
  const [phoneNumber,setPhoneNumber] = useState("")
  const [password,setPassword] = useState("")

const {mutate,isPending,isSuccess,isError,error} = useMutation({
    mutationFn:loginAdmin,
    onSuccess:(data)=>{
        localStorage.setItem("adminToken",data.token)
        localStorage.setItem("adminRefreshToken",data.refreshToken)
  
    toast.success("Login Success")
    navigate("/admin/analatics")

    },
    onError:(err)=>{
      toast.error(err.message)
     
    }
})



const handleAdminLogin  = ()=>{
  mutate({
    phoneNumber,
    password
  })
}

  return (
    <div className='AdminLogin'>
<div className="adminLoginContainer">
  <h3>Admin Login</h3>
  <div className="adminLoginForm">
    <div className="adminLoginPhone">
    <input type="text" placeholder='Phone Number' onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber}/>
      <i id="phoneicon" class="fa-solid fa-phone"></i>
    </div>
<div className="adminLoginPassword">
<input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
 <i id="passwordicon" class="fa-solid fa-lock"></i>
</div>
<div className="adminLoginForgot">
  <a href="">Forgot password?</a>
</div>
    <div className="adminLoginButton">
      <button onClick={handleAdminLogin} disabled={isPending}>{isPending ? <FaSpinner className="spin" /> : "Login"}</button>
    </div>
  </div>
</div>
    </div>
  )
}
