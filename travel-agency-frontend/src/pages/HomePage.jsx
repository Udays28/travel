import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPackages } from '../redux/packageSlice'
import PackageCard from '../components/PackageCard'

const HomePage = () => {
  const dispatch = useDispatch()
  const { items: packages, status, error } = useSelector((state) => state.packages)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPackages())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to TravelEase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} package={pkg} />
        ))}
      </div>
    </div>
  )
}

export default HomePage