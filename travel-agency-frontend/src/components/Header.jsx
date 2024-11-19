import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-600">TravelEase</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-600 hover:text-primary-600">Home</Link></li>
            <li><Link to="/packages" className="text-gray-600 hover:text-primary-600">Packages</Link></li>
            {user ? (
              <>
                <li>
                  <Link 
                    to={user.role === 'admin' ? '/admin-dashboard' : user.role === 'vendor' ? '/vendor-dashboard' : '/user-dashboard'} 
                    className="text-gray-600 hover:text-primary-600"
                  >
                    Dashboard
                  </Link>
                </li>
                <li><button onClick={handleLogout} className="text-gray-600 hover:text-primary-600">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="text-gray-600 hover:text-primary-600">Login</Link></li>
                <li><Link to="/signup" className="text-gray-600 hover:text-primary-600">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header