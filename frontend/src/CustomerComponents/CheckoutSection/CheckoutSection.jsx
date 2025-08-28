import React, { useState } from 'react'
import "./CheckoutSection.css"
import razor from "../../assets/images/razorpay_logo.png"
import { createPayment, updatelocationByCustomer } from '../../api/auth'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'
export const CheckoutSection = ({cartData,personalData}) => {
     const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

const handlePaymentSelect = (method)=>{ setPaymentMethod(method) }

  // ✅ Payment API
  const Payments = useMutation({
    mutationFn: ({ token, paymentMethod, deliveryLocation }) =>
      createPayment({ token, paymentMethod, deliveryLocation }),
    onSuccess: () => {
      toast.success("Order Placed");
      navigate("/profile");
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
      console.error(errorMessage);
    },
  });

  // ✅ Location Update API
  const Location = useMutation({
    mutationFn: ({ lat, lng, token }) =>
      updatelocationByCustomer({ lat, lng, token }),
    onSuccess: (data) => {
         localStorage.setItem("lat", deliveryLocation.lat);
          localStorage.setItem("lng", deliveryLocation.lng);
      toast.success("Location updated in profile");
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
      console.error(errorMessage);
    },
  });

  // ✅ Handle Payments
  const handlePayments = (e) => {
    e.preventDefault();
    if (!deliveryLocation) {
      setShowLocationPopup(true);
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    Payments.mutate({ token, paymentMethod, deliveryLocation });
  };

  // ✅ Fetch Current Location
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setDeliveryLocation(newLocation);
        toast.success("Location set successfully!");
        setShowLocationPopup(false);

        // update in DB as well
        Location.mutate({ ...newLocation, token });
      },
      (error) => {
        toast.error("Failed to fetch location");
        console.error(error);
      }
    );
  };

  return (
 <div className='checkoutSection'>
<div className="checkoutSectionTop">
    <h3 className='checkoutSectionTopHeadingDelivery'>Delivery</h3>
    <h3 className='checkoutSectionTopHeadingInformation'>Information</h3>
</div>
<div className="checkoutMidSection">
    <div className="checkoutAddressSection">

        {personalData?.user?.address[0] ? (
<div>
      <div className='CheckoutAlreadyAccountSection'>
<p>{personalData?.user?.address[0].addressLine1}</p>
<p>{personalData?.user?.address[0].addressLine2}</p>
<p>{personalData?.user?.address[0].landmark}</p>
<p>{personalData?.user?.address[0].state}</p>
<p>{personalData?.user?.address[0].city}</p>
<p>{personalData?.user?.address[0].zipCode}</p>
        </div>
</div>
        ) : (
<form className="checkoutAddressFormSection">
            <div className="checkoutNameDetailsCollectingSection">
                <input className='checkoutFirstNameDetailsSection' placeholder='First Name' type="text" name="" id="" />
                <input className='checkoutSecondNameDetailsSection' placeholder='Second Name' type="text" name="" id="" />
            </div>
            <input className='checkoutUserEmailAddress' placeholder='Email Address' type="email" name="" id="" />
            <div className="checkoutUserAddressSection">
                <input className='checkoutUserAddressInput1' placeholder='Address Line 1' type="text" name="" id="" />
                <input className='checkoutUserAddressInput2' placeholder='Address Line 2' type="text" name="" id="" />
            </div>
            <div className="checkoutUserCityDetailsSection">
                <input className='checkoutUserCityNameInput' placeholder='City' type="text" name="" id="" />
                <input className='checkoutUserCityPincodeInput' placeholder='Pincode' type="text" name="" id="" />
            </div>
            <input className='checkoutUserPhoneNumberInput' placeholder='Phone Number' type="tel" name="" id="" />
        </form>

        )}
        

    </div>
    <div className="checkoutPaymentSection">
        <div className='checkoutPaymentSectionHeadingMain'>
            <h3 className='checkoutPaymentSectionHeadingCart'>Cart</h3>
            <h3 className='checkoutPaymentSectionHeadingTotals'>Totals</h3>
        </div>
        <div className='checkoutCartMainSection'>
            <div className="checkoutCartTotalSection">
                <h4 className='checkoutCartTotalHeading'>Subtotal</h4>
                <p className='checkoutCartTotalAmount'>&#8377;{cartData?.cart[0]?.totalPrice}</p>
            </div>
            <div className="checkOutShippingChargesSection">
                <h4 className='checkoutShippingChargesHeading'>Charges</h4>
                <p>&#8377;40</p>
            </div>
            <div className="checkOutShippingChargesTotalSection">
                <h4>Total</h4>
                <p>&#8377;{cartData.cart[0]?.totalPrice + 40}</p>
            </div>
        </div>
        <div className="checkOutPaymentOptions">
            <div className='checkOutPaymentOptionsHeadingMain'>
                <h3 className='checkOutPaymentOptionsHeadingPayment'>Payment</h3>
                <h3 className='checkOutPaymentOptionsHeadingMethod'>Method</h3>
            </div>
            <div className="checkOutPayments">
                <form className='checkOutPaymentsFormMainSection' action="">
                    <div className='checkoutPaymentFormInputSection'>
                        <div className="checkOutPaymentRazorPaySection" onClick={()=>handlePaymentSelect("razorpay")}>
                            <input className='checkOutPaymentRazorPayCheckBox' type="radio" name="paymentMethod" id=""  checked={paymentMethod === "razorpay"}
          readOnly />
                            <img className='checkOutPaymentRazorPayLogo' src={razor} alt="" />
                        </div>
                        <div className='checkOutPaymentCashOnDeliverySection' onClick={()=>handlePaymentSelect("COD")}>
                            <input className='checkOutPaymentCashOnDeliveryCheckBox' type="radio" name="paymentMethod" id=""  checked={paymentMethod === "COD"}
          readOnly />
                            <label htmlFor="">Cash On Delivery</label>
                        </div>
                    </div>
                    <button className='checkOutPlaceOrderbutton' type="submit" disabled={!paymentMethod || cartData?.cart[0]?.items.length == 0} onClick={handlePayments}>{cartData?.cart[0]?.items.length == 0 ? "No Items" : "Place Order"}</button>
                </form>
            </div>
        </div>
    </div>
</div>
 {showLocationPopup && (
        <div className="locationPopupOverlay">
          <div className="locationPopup">
            <h3>Use Current Location as Delivery Location?</h3>
            <div className="popupButtons">
              <button onClick={fetchCurrentLocation}>Yes, Use Current Location</button>
              <button onClick={() => setShowLocationPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

</div>
  )
}
