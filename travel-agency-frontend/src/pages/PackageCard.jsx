import React from 'react'
import { Link } from 'react-router-dom'

const PackageCard = ({ package: pkg }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
        <p className="text-gray-700 mb-2">{pkg.description.substring(0, 100)}...</p>
        <p className="text-lg font-bold mb-2">${pkg.price}</p>
        <p className="text-gray-600 mb-4">{pkg.duration}</p>
        <Link to={`/package/${pkg._id}`} className="bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default PackageCard