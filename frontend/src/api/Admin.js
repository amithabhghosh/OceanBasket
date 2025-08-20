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