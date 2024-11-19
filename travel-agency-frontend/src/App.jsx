import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import './styles/index.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const PackageDetails = lazy(() => import('./pages/PackageDetails'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const UserDashboard = lazy(() => import('./pages/UserDashboard'))
const VendorDashboard = lazy(() => import('./pages/VendorDashboard'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/package/:id" element={<PackageDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App