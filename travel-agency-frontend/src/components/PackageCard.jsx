import React from 'react'
import { Link } from 'react-router-dom'

export default function PackageCard({ package: pkg }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={`${import.meta.env.VITE_API_URL}/${pkg.image}`} alt={pkg.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">${pkg.price}</span>
          <Link to={`/package/${pkg._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md">View Details</Link>
        </div>
      </div>
    </div>
  )
}