import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPackageById } from '../redux/packageSlice'
import BookingForm from '../components/BookingForm'

const PackageDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentPackage, status, error } = useSelector((state) => state.packages)

  useEffect(() => {
    dispatch(fetchPackageById(id))
  }, [dispatch, id])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  if (!currentPackage) {
    return <div>Package not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{currentPackage.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={currentPackage.image} alt={currentPackage.name} className="w-full h-64 object-cover rounded-lg" />
          <p className="mt-4 text-lg">{currentPackage.description}</p>
          <p className="mt-2 text-xl font-bold">Price: ${currentPackage.price}</p>
          <p className="mt-2">Duration: {currentPackage.duration}</p>
          <h2 className="text-2xl font-bold mt-4 mb-2">Itinerary:</h2>
          <ul className="list-disc list-inside">
            {currentPackage.itinerary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <BookingForm packageId={currentPackage._id} price={currentPackage.price} />
        </div>
      </div>
    </div>
  )
}

export default PackageDetails