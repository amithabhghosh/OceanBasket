import API from "../connectApi"

export const loginOwner = async ({phone,password})=>{
    const response = await API.post("/owner/login",{phone,password})
    return response.data
}

export const getFish = async ({ownerToken})=>{
    const response = await API.get("/product/getFish",{headers:{token:ownerToken}})
    return response.data
}

export const getFishDetail = async ({fishId})=>{
    const response = await API.get(`/product/getFishByFishId/${fishId}`)
    return response.data
}

export const getFishImageList = async ({ownerToken}) =>{
    const response = await API.get("/fishImage/getFishList",{headers:{token:ownerToken}})
    return response.data
}

export const addFishByOwner = async ({name,availableQuantityKg,pricePerKg,type,ownerToken})=>{
    const response = await API.post("/product/addFish",{name,availableQuantityKg,pricePerKg,type},{headers:{token:ownerToken}})
    return response.data
}

export const getOwnerData = async ({ownerToken})=>{
    const response = await API.get("/owner/getOwnerData",{headers:{token:ownerToken}})
    return response.data
}

export const getEditTime = async () => {
    const response = await API.get("/owner/getTime")
    return response.data
}

export const updateQuantity = async ({ownerToken,quantity,fishId})=>{
    const response = await API.put(`/owner/updateQuantity/${fishId}`,{quantity},{headers:{token:ownerToken}})
    return response.data
}

export const getOrdersByOwner = async ({ownerToken})=>{
const response = await API.get("/order/getOrderByShop",{headers:{token:ownerToken}})
return response.data
}

export const updateOrderByOwner = async ({ownerToken,status,orderId})=>{
    console.log(ownerToken,status,orderId)
    const response = await API.put(`/order/updateOrderByOwner/${orderId}`,{status},{headers:{token:ownerToken}})
    return response.data
}

export const locationUpdating = async ({ownerToken,lat,lng})=>{
    const response = await API.put("/location/locationByOwner",{lat,lng},{headers:{token:ownerToken}})
    return response.data
}