import React from 'react'
import { Link } from 'react-router-dom'

export default function DestinationCard({ destination }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={`${import.meta.env.VITE_API_URL}/images/placeholder-${destination.toLowerCase()}.jpg`} alt={destination} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{destination}</h3>
        <Link to={`/destination/${destination.toLowerCase()}`} className="text-blue-600 hover:underline">Explore packages</Link>
      </div>
    </div>
  )
}