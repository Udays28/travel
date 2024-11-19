import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserBookings } from '../redux/bookingSlice'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const { items: bookings, status, error } = useSelector((state) => state.bookings)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchUserBookings())
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-bold mb-2">{booking.package.name}</h3>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
              <p>Price: ${booking.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserDashboard