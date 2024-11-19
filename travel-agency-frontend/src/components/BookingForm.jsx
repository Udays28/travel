import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBooking } from '../redux/bookingSlice'

const BookingForm = ({ packageId, price }) => {
  const [date, setDate] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    const bookingData = {
      package: packageId,
      date,
      numberOfPeople,
      totalPrice: price * numberOfPeople,
    }
    dispatch(createBooking(bookingData))
  }

  if (!user) {
    return <p>Please log in to book this package.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Book This Package</h2>
      <div className="mb-4">
        <label htmlFor="date" className="block mb-2">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="numberOfPeople" className="block mb-2">Number of People</label>
        <input
          type="number"
          id="numberOfPeople"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
          min="1"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <p className="text-xl font-bold mb-4">Total Price: ${price * numberOfPeople}</p>
      <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700">
        Book Now
      </button>
    </form>
  )
}

export default BookingForm