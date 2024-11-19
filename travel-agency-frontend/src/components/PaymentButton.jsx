import React from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID

export default function PaymentButton({ amount, packageId }) {
  const handlePayment = async () => {
    try {
      const response = await axios.post(`${API_URL}/payments/create-order`, {
        amount: amount * 100, // Razorpay expects amount in paise
        packageId,
      })

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: "INR",
        name: "TravelEase",
        description: "Package Payment",
        order_id: response.data.id,
        handler: function (response) {
          alert("Payment Successful")
          // Handle successful payment (e.g., update order status)
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      }

      const rzp1 = new window.Razorpay(options)
      rzp1.open()
    } catch (error) {
      console.error("Error creating Razorpay order:", error)
      alert("Error creating order. Please try again.")
    }
  }

  return (
    <button onClick={handlePayment} className="bg-blue-600 text-white px-4 py-2 rounded-md">
      Book Now
    </button>
  )
}