import React, { useEffect, useState } from 'react';
import './FishAdd.css';
import { toast } from 'react-toastify'
import { addFishByOwner } from '../../api/owner';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
export const FishAdd = ({data,isLoading,errors,refetch}) => {
const ownerToken = localStorage.getItem("ownerToken")
  const [filteredFishes, setFilteredFishes] = useState([]);
const navigate = useNavigate()
const [fishInputs, setFishInputs] = useState({});



useEffect(() => {
  if (data?.fishesList) {
    setFilteredFishes(data.fishesList);
  }
}, [data]);


const handleAddFish = (fishId) => {
  const fishData = fishInputs[fishId];

  if (!fishData) return toast.error("Please fill all fields");

  const { name, quantity, price, type } = fishData;

  if (!quantity || quantity < 10) {
    return toast.error("Min Quantity is 10Kg");
  }
  if (!price || price.trim() === "") {
    return toast.error("Price is required");
  }
  if (!type) {
    return toast.error("Please select fish type");
  }

  mutate({
    name,
    availableQuantityKg: quantity,
    pricePerKg: price,
    type,
    ownerToken,
  });
};


const {mutate,isPending,isSuccess,isError,error} = useMutation({
    mutationFn:addFishByOwner,
    onSuccess:(data)=>{
      
    
    toast.success("Fish Added")

refetch()
    },
    onError:(err)=>{
        const errorMessage =
           err.response?.data?.message || 
           err.message ||                 
           "Something went wrong";        
       
         toast.error(errorMessage);
         console.log(errorMessage);
    }
})

  return (
    <div className="fish-table-wrapper">
      <div className="ownerFishAddBackBtn">
 <p onClick={() => navigate(-1)}> <ion-icon name="arrow-back-circle-outline"></ion-icon> Back</p>
      </div>
      
      <table className="fish-table">
        <thead>
          <tr>
            <th className='OwnerAddFishTableFishName'>Fish Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th className='OwnerAddFishTypeHead'>Type</th>
          
          </tr>
        </thead>
        <tbody>


         {filteredFishes.map((fish) => (
  <tr key={fish._id} className="ownerFishAddTrSection">
    <td className="ownerFishAddSectionNameTd">{fish.FishName}</td>

    <td>
      <div className="input-group">
        <input
          type="number"
          placeholder="min. 10kg"
          onChange={(e) =>
            setFishInputs((prev) => ({
              ...prev,
              [fish._id]: {
                ...prev[fish._id],
                quantity: e.target.value,
                name: fish.FishName,
              },
            }))
          }
        />
        <span>kg</span>
      </div>
    </td>

    <td>
      <div className="input-group">
        <input
          type="number"
          placeholder="Enter price"
          onChange={(e) =>
            setFishInputs((prev) => ({
              ...prev,
              [fish._id]: {
                ...prev[fish._id],
                price: e.target.value,
                name: fish.FishName,
              },
            }))
          }
        />
        <span>/kg</span>
      </div>
    </td>

    <td className="fishTypeSelectTd">
      <select
        className="fish-type-select"
        onChange={(e) =>
          setFishInputs((prev) => ({
            ...prev,
            [fish._id]: {
              ...prev[fish._id],
              type: e.target.value,
              name: fish.FishName,
            },
          }))
        }
      >
        <option value="">Select type</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
    </td>

    <td className="OwnerfishAddButtonSection">
      <button
        className="add-btn"
        onClick={() => handleAddFish(fish._id)}
      >
        Add
      </button>
    </td>
  </tr>
))}




        </tbody>
      </table>

<div className="ownerFishAddMobileParent">


{filteredFishes.map((fish)=>(
 <div className="ownerFishAddMobile">
      <div className="ownerFishAddMobile-info">
        <p className="ownerFishAddMobile-name">{fish.FishName}</p>
      </div>

      <div className="ownerFishAddMobile-inputs">
        <input
          type="text"
          placeholder="Price (₹)"
        onChange={(e) =>
            setFishInputs((prev) => ({
              ...prev,
              [fish._id]: {
                ...prev[fish._id],
                price: e.target.value,
                name: fish.FishName,
              },
            }))
          }
        />
        <input
          type="text"
          placeholder="Quantity (kg)"
          onChange={(e) =>
            setFishInputs((prev) => ({
              ...prev,
              [fish._id]: {
                ...prev[fish._id],
                quantity: e.target.value,
                name: fish.FishName,
              },
            }))
          }
        />
      </div>

      <div className="ownerFishAddMobile-select">


<select   onChange={(e) =>
          setFishInputs((prev) => ({
            ...prev,
            [fish._id]: {
              ...prev[fish._id],
              type: e.target.value,
              name: fish.FishName,
            },
          }))
        } >
          <option value="">Select type</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        


      </div>

 <button className="ownerFishAddMobile-btn" onClick={() => handleAddFish(fish._id)} >Add</button>

     
    </div>
))}
   

</div>

    </div>
  );
};
