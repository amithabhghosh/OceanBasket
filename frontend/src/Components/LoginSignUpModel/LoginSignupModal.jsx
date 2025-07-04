import React, { useState, useContext } from "react";
import axios from "axios";
import "./LoginSignupModal.css";
import { ContextAPI } from "../../Context/ContextAPI";
import { toast } from "react-toastify";
import API from "../../connectApi";

const LoginSignupModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
const {token,setToken,login} = useContext(ContextAPI)

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email.trim()) return setError("Email is required");
    if (!password.trim()) return setError("Password is required");

    const endpoint = activeTab === "login" ? "/customer/login" : "/customer/register";

    try {
      const res = await API.post(endpoint, formData);

      if (activeTab === "login") {
        const { token } = res.data;
        login(res.data.token)
        setToken(token)
        toast.success("Login Success")
        
      } else {
        toast.success("Register Success")
        console.log("Signup successful");
      }

      setFormData({ email: "", password: "" });
      onClose();
    } catch (err) {
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Server error. Try again.");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-tabs">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => {
              setActiveTab("login");
              setError("");
            }}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => {
              setActiveTab("signup");
              setError("");
            }}
          >
            Signup
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <button type="submit">
            {activeTab === "login" ? "Login" : "Signup"}
          </button>
          {error && <p className="modal-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginSignupModal;
