export const getDefaultPincode = ()=>{
    const user = localStorage.getItem("user")

    if(!user || !user.address || !user.address.length === 0){
        return null
    }

    const defaultAddress = user.address.find(add=>add.default===true)

    return defaultAddress?.zipCode || null;
}