import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TravelEase</h3>
            <p>Your trusted partner for unforgettable travel experiences.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary-400">Home</Link></li>
              <li><Link to="/packages" className="hover:text-primary-400">Packages</Link></li>
              <li><Link to="/about" className="hover:text-primary-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>123 Travel Street, City, Country</p>
            <p>Phone: +1 234 567 890</p>
            <p>Email: info@travelease.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary-400"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-white hover:text-primary-400"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white hover:text-primary-400"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white hover:text-primary-400"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer