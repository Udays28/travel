import express from 'express'
import { createBooking, getUserBookings, getVendorBookings, updateBookingStatus } from '../controllers/bookingController.js'
import { protect, vendor } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createBooking)
router.route('/user').get(protect, getUserBookings)
router.route('/vendor').get(protect, vendor, getVendorBookings)
router.route('/:id').put(protect, vendor, updateBookingStatus)

export default router