import API from "../connectApi"

export const loginCustomer = async ({phoneNumber,password}) =>{
    const response = await API.post("/customer/login",{phone:phoneNumber,password})
    return response.data
}

export const getShopsByPincode = async ({pageParam = 0, limit,zipCode})=>{
    const response = await API.get(`/customer/listShopByPincode/${zipCode}?limit=${limit}&skip=${pageParam}`)
    
    return {
          shops: response.data.shops,
    nextPage: pageParam + limit,
    hasMore: response.data.shops.length === limit,
    }
}

export const getFishWithHighRating = async ({ zipCode, skip = 0 }) => {
  const response = await API.get(`/customer/getFishesWithRating/${zipCode}?skip=${skip}`);
  return response.data;
};

export const getFishesByPincode = async ({ zipCode}) => {
  const response = await API.get(`/product/getFishByPincode/${zipCode}`);
  return response.data;
};

export const getShopByShopId = async ({ownerId}) =>{
const response = await API.get(`/customer/getShopByShopId/${ownerId}`)
return response.data
}

export const getFishByFishId = async ({fishId})=>{
  const response = await API.get(`/product/getFishByFishId/${fishId}`)
  return response.data
}

export const getShopsByFishId = async ({fishId,zipCode})=>{
  const response = await API.get(`/product/getShopByFishId/${fishId}/${zipCode}`)
  return response.data
}

export const addtoCart = async ({productId,quantity,shopId,token})=>{
  const response = await API.post("/customer/cart",{productId,quantity,shopId},{headers:{token:token}})
  return response.data;
}

export const getCart = async ({token})=>{
  const response = await API.get("/customer/cart",{headers:{token:token}})
  return response.data
}

export const updateCart = async ({token,productId, quantity, price})=>{
  const response = await API.put("/customer/cart",{productId, quantity, price},{headers:{token:token}})
  return response.data
}
export const deleteCart = async ({token,productId})=>{
  const response = await API.delete(`/customer/cart/${productId}`,{headers:{token:token}})
  return response.data
}

export const getProfile = async ({token})=>{
  const response = await API.get("/customer/getprofile",{headers:{token:token}})
  return response.data
}

export const updateProfile = async ({token,name, email, alternativeNumber})=>{
  const response = await API.put("/customer/updateProfile",{name,email,alternativeNumber},{headers:{token:token}})
  return response.data
}

export const updateAddress = async ({token, addressLine1, addressLine2, city, zipCode, landmark})=>{
  const response = await API.put("/customer/editAddress",{ addressLine1,addressLine2,city,zipCode,landmark},{headers:{token:token}})
  return response.data
}
export const addAddress = async ({token, addressLine1,addressLine2,city,zipCode,landmark})=>{
  const response = await API.post("/customer/addAddress",{ addressLine1,addressLine2,city,zipCode,landmark},{headers:{token:token}})
  return response.data
}

export const deleteAddress = async ({token})=>{
  const response = await API.delete("/customer/deleteAddress",{headers:{token:token}})
    return response.data
}