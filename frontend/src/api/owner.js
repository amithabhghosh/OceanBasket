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