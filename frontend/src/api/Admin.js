import API from "../connectApi"

export const loginAdmin = async ({phoneNumber,password})=>{
    const response = await API.post("/admin/login",{phoneNumber,password})
    return response.data
}

export const getAllCustomers = async ({adminToken})=>{
    const response = await API.get("/admin/getAllCustomer",{headers:{token:adminToken}})
    return response.data
}

export const getAllOwners = async ({adminToken})=>{
    const response = await API.get("/admin/getAllOwners",{headers:{token:adminToken}})
    return response.data
}

export const getAllFishes = async ({adminToken})=>{
    const response = await API.get("/admin/getAllFishes",{headers:{token:adminToken}})
    return response.data
}

export const getAllOrders = async ({adminToken})=>{
    const response = await API.get("/admin/getAllOrders",{headers:{token:adminToken}})
    return response.data
}

export const updatedeleiveryStatus = async ({adminToken,orderId,orderStatus})=>{
    console.log(adminToken,orderId,orderStatus)
    const response = await API.put(`/admin/updateDelivered/${orderId}`,{orderStatus},{headers:{token:adminToken}})
    
    return response.data
}


export const registerOwner = async ({adminToken,ownerName,email,password,phone,shopName,zipCode, addressLine1, addressLine2, city, state, shopOpenTime,shopCloseTime,deliveryRadiusInKm})=>{
    const response = await API.post("/owner/register",{ownerName,email,password,phone,shopName,zipCode, addressLine1, addressLine2, city, state, shopOpenTime,shopCloseTime,deliveryRadiusInKm},{headers:{token:adminToken}})
    return response.data
}

export const updateVerifyCustomer = async ({userId,adminToken,verified})=>{
    
    const response = await API.put(`/admin/updateVerifyCustomer/${userId}`,{verified},{headers:{token:adminToken}})
    return response.data
}

export const updateVerifyOwner = async ({ownerId,adminToken,verified})=>{
    const response = await API.put(`/admin/updateVerifyOwner/${ownerId}`,{verified},{headers:{token:adminToken}})
    return response.data
}

export const getChartData = async ({adminToken})=>{
    const response = await API.get("/order/getChartDataForOrders",{headers:{token:adminToken}})
    return response.data
}

export const addpercentage = async ({adminToken,percentage})=>{
    const response = await API.post("/admin/addpercentage",{percentage},{headers:{token:adminToken}})
    return response.data
}