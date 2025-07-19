import API from "../connectApi"

export const loginCustomer = async ({phoneNumber,password}) =>{
    const response = await API.post("/customer/login",{phone:phoneNumber,password})
    return response.data
}