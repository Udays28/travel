import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPackages } from '../redux/packageSlice'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { items: packages, status: packageStatus, error: packageError } = useSelector((state) => state.packages)
  const { user, token } = useSelector((state) => state.auth)
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('packages')

  useEffect(() => {
    dispatch(fetchPackages())
    fetchUsers()
  }, [dispatch])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  if (packageStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (packageStatus === 'failed') {
    return <div>Error: {packageError}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <div className="mb-4">
        <button
          className={`mr-4 ${activeTab === 'packages' ? 'font-bold' : ''}`}
          onClick={() => setActiveTab('packages')}
        >
          Packages
        </button>
        <button
          className={activeTab === 'users' ? 'font-bold' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>
      {activeTab === 'packages' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">All Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <div key={pkg._id} className="border rounded-lg p-4 shadow-md">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p>Price: ${pkg.price}</p>
                <p>Duration: {pkg.duration}</p>
                <p>Vendor: {pkg.vendor.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'users' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">All Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user._id} className="border rounded-lg p-4 shadow-md">
                <h3 className="text-xl font-bold mb-2">{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard