import React, { useContext, useEffect, useState } from 'react';
import "./AdressSection.css";
import { ContextAPI } from '../../Context/ContextAPI';
import API from "../../connectApi";

export const AdressSection = () => {
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editAddress, setEditAddress] = useState(null);

  const { token } = useContext(ContextAPI);

  const [newAddress, setNewAddress] = useState({
    firstName: "",
    secondName: "",
    zipCode: "",
    state: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: ""
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await API.get("/customer/getaddress", {
        headers: { token }
      });
      if (res.data.success) {
        setAddresses(res.data.addresses);
      }
    } catch (err) {
      console.error("Failed to load addresses", err);
    }
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditAddress({ ...editAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async () => {
    try {
      const res = await API.post("/customer/addAddress", newAddress, {
        headers: { token }
      });

      if (res.data.success) {
        setAddresses(res.data.addresses);
        setIsAdding(false);
        setNewAddress({
          firstName: "",
          secondName: "",
          zipCode: "",
          state: "",
          addressLine1: "",
          addressLine2: "",
          landmark: "",
          city: ""
        });
      }
    } catch (err) {
      console.error("Failed to add address:", err);
    }
  };

  const startEdit = (index, address) => {
    setEditingIndex(index);
    setEditAddress({ ...address });
  };

  const handleSaveEdit = async (index) => {
    try {
      const res = await API.put("/customer/editAddress", {
        index,
        updatedAddress: editAddress
      }, {
        headers: { token }
      });

      if (res.data.success) {
        setAddresses(res.data.addresses);
        setEditingIndex(null);
        setEditAddress(null);
      }
    } catch (err) {
      console.error("Failed to edit address:", err);
    }
  };

const handleDelete = async (index) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this address?");
//   if (!confirmDelete) return;

  try {
    const res = await API.delete("/customer/deleteAddress", {
      headers: { token },
      data: { index }
    });

    if (res.data.success) {
      setAddresses(res.data.addresses); // Update local state
      toast.success("Address deleted successfully!");
    }
  } catch (err) {
    console.error("Delete failed:", err);
    toast.error("Failed to delete address.");
  }
};

  return (
    <div className="address-section">
      <button onClick={() => setIsAdding(true)}>➕ Add New Address</button>

      {isAdding && (
        <div className="add-address-form">
          {["firstName", "secondName", "addressLine1", "addressLine2", "landmark", "city", "state", "zipCode"].map(field => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={newAddress[field]}
              onChange={handleChange}
            />
          ))}

          <div className="form-actions">
            <button onClick={handleAddAddress}>💾 Save</button>
            <button onClick={() => setIsAdding(false)}>❌ Cancel</button>
          </div>
        </div>
      )}

      <div className="saved-addresses">
        {addresses.length === 0 ? (
          <p>No addresses saved yet.</p>
        ) : (
          addresses.map((addr, index) => (
            <div className="address-card" key={index}>
              {editingIndex === index ? (
                <div className="edit-address-form">
                  {["firstName", "secondName", "addressLine1", "addressLine2", "landmark", "city", "state", "zipCode"].map(field => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                      value={editAddress[field]}
                      onChange={handleEditChange}
                    />
                  ))}

                  <div className="form-actions">
                    <button onClick={() => handleSaveEdit(index)}>💾 Save</button>
                    <button onClick={() => setEditingIndex(null)}>❌ Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p><strong>{addr.firstName} {addr.secondName}</strong></p>
                  <p>{addr.addressLine1}, {addr.addressLine2}</p>
                  <p>Landmark: {addr.landmark}</p>
                  <p>{addr.city}, {addr.state} - {addr.zipCode}</p>
                  <div className="card-buttons">
  <button className="edit-btn" onClick={() => startEdit(index, addr)}>✏️ Edit</button>
  <button className="delete-btn" onClick={() => handleDelete(index)}>🗑️ Delete</button>
</div>

                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
