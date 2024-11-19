import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVendorBookings } from '../redux/bookingSlice'
import { fetchPackages } from '../redux/packageSlice'

const VendorDashboard = () => {
  const dispatch = useDispatch()
  const { items: bookings, status: bookingStatus, error: bookingError } = useSelector((state) => state.bookings)
  const { items: packages, status: packageStatus, error: packageError } = useSelector((state) => state.packages)
  const { user } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState('bookings')

  useEffect(() => {
    dispatch(fetchVendorBookings())
    dispatch(fetchPackages())
  }, [dispatch])

  if (bookingStatus === 'loading' || packageStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (bookingStatus === 'failed') {
    return <div>Error: {bookingError}</div>
  }

  if (packageStatus === 'failed') {
    return <div>Error: {packageError}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <div className="mb-4">
        <button
          className={`mr-4 ${activeTab === 'bookings' ? 'font-bold' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
        <button
          className={activeTab === 'packages' ? 'font-bold' : ''}
          onClick={() => setActiveTab('packages')}
        >
          Packages
        </button>
      </div>
      {activeTab === 'bookings' && (
        <div>
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
      )}
      {activeTab === 'packages' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Packages</h2>
          {packages.length === 0 ? (
            <p>You have no packages yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <div key={pkg._id} className="border rounded-lg p-4 shadow-md">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p>Price: ${pkg.price}</p>
                  <p>Duration: {pkg.duration}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default VendorDashboard