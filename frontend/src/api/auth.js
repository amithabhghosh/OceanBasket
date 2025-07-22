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