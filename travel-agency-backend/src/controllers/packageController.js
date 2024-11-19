import TourPackage from '../models/TourPackage.js'

export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate('vendor', 'name email')
    res.json(packages)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getPackageById = async (req, res) => {
  try {
    const tourpackage = await TourPackage.findById(req.params.id).populate('vendor', 'name email')
    if (tourpackage) {
      res.json(tourpackage)
    } else {
      res.status(404).json({ message: 'Package not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const createPackage = async (req, res) => {
  const { name, description, price, duration, image, itinerary } = req.body

  try {
    const tourpackage = new Package({
      name,
      description,
      price,
      duration,
      image,
      itinerary,
      vendor: req.user._id,
    })

    const createdPackage = await tourpackage.save()
    res.status(201).json(createdPackage)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updatePackage = async (req, res) => {
  const { name, description, price, duration, image, itinerary } = req.body

  try {
    const tourpackage = await TourPackage.findById(req.params.id)

    if (tourpackage) {
      tourpackage.name = name
      tourpackage.description = description
      tourpackage.price = price
      tourpackage.duration = duration
      tourpackage.image = image
      tourpackage.itinerary = itinerary

      const updatedPackage = await tourpackage.save()
      res.json(updatedPackage)
    } else {
      res.status(404).json({ message: 'Package not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const deletePackage = async (req, res) => {
  try {
    const tourpackage = await TourPackage.findById(req.params.id)

    if (tourpackage) {
      await tourpackage.remove()
      res.json({ message: 'Package removed' })
    } else {
      res.status(404).json({ message: 'Package not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}