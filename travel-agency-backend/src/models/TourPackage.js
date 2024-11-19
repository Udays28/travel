import mongoose from 'mongoose'

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  itinerary: [{
    type: String,
  }],
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
})

const TourPackage = mongoose.model('Package', packageSchema)

export default TourPackage