import express from 'express'
import { getPackages, getPackageById, createPackage, updatePackage, deletePackage } from '../controllers/packageController.js'
import { protect, vendor } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getPackages).post(protect, vendor, createPackage)
router.route('/:id').get(getPackageById).put(protect, vendor, updatePackage).delete(protect, vendor, deletePackage)

export default router