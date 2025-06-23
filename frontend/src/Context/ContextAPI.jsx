import { createContext, useEffect, useState } from "react";
import sardine from "../assets/images/fish1.jpg"
import whiteFish from "../assets/images/fish2.jpg"
import keralaCrap from "../assets/images/fish3.jpg"
import thredFin from "../assets/images/fish4.jpg"
import baramudi from "../assets/images/fish5.jpg"
import keralaPeral from "../assets/images/cat1.jpg"
import shop1 from "../assets/images/shop1.jpg"
import shop2 from "../assets/images/shop2.jpg"
import shop3 from "../assets/images/shop3.jpg"
import shop4 from "../assets/images/shop4.jpg"
import shop5 from "../assets/images/shop5.jpg"
import { toast } from "react-toastify";
import axios from "axios";
export const ContextAPI = createContext();

const ContextProvider = ({children})=>{

    const [fishes,setFishes] = useState([
    {
        id:1,
name:"Sardine Bigചാള (20-30count)",
price:100,
quantity:500,
off:20,
image:sardine,
deal:true,
availabilty:true,
category:"Bony"
    },
    {
        id:2,
        name:"White Fish Medium പരവ (90-120g)",
        price:200,
        quantity:500,
        off:25,
        image:whiteFish,
        deal:false,
        availabilty:true,
        category:"Cart"
    },
    {
        id:3,
        name:"Kerala Carp കട്‌ല - കായൽ",
        price:150,
        quantity:250,
        off:30,
        image:keralaCrap,
        deal:true,
        category:"Freshwater",
        availabilty:true
    },
    {
        id:4,
        name:"Threadfin Bream Big കിളിമീൻ",
        price:200,
        quantity:500,
        off:25,
        image:thredFin,
        deal:false,
        category:"Salt",
        availabilty:true
    },
    {
        id:5,
        name:"Barramundi-Kayal കായൽ കാളാഞ്ചി",
        price:200,
        quantity:500,
        off:25,
        image:baramudi,
        deal:true,
        category:"Oily",
        availabilty:true
    },
    {
        id:6,
        name:"Kerala Pearl Spot medium / നാടൻ കരിമീൻ",
        image:keralaPeral,
        quantity:500,
        price:500,
        deal:false,
        category:"Bony",
        availabilty:true
    }
])

const [shops,setShops]= useState([
    {
        id:1,
        name:"Shop 1",
        image:shop1,
        place:"Thripunithura"
    },
    {
        id:2,
        name:"Shop 2",
        image:shop2,
        place:"Vytilla"
    },
     {
        id:3,
        name:"Shop 3",
        image:shop3,
        place:"Elamkulam"
    },
    {
        id:4,
        name:"Shop 4",
        image:shop4,
        place:"Ernakulam South"
    },
     {
        id:5,
        name:"Shop 5",
        image:shop5,
        place:"Menaka"
    }
])

const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("Token"));
 
  const login = (token) => {
    localStorage.setItem("Token", token);
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("Token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("Token"));
  }, []);
const [token,setToken]=useState(localStorage.getItem("Token")?localStorage.getItem("Token"):false)
 const [cartItems, setCartItems] = useState([]);
  const getCartData = async () => {
    const token = localStorage.getItem("Token");
    if (!token) return;

    try {
      const res = await axios.get("https://oceanbasket.onrender.com/api/customer/cart", {
        headers: { token },
      });

      if (res.data.success) {
        setCartItems(res.data.cart);
      }
    } catch (error) {
      toast.error(error.response?.data || error.message)
      console.error("Failed to fetch cart:", error.response?.data || error.message);
    }
  };

  useEffect(()=>{
    if(token){
 getCartData()
    }
   
  },[cartItems])


    return(
        <ContextAPI.Provider value={{fishes,setFishes,shops,setShops,token,setToken,getCartData,cartItems,setCartItems,isLoggedIn,login,logout}}>
{children}
        </ContextAPI.Provider>
    )
}
export default ContextProvider