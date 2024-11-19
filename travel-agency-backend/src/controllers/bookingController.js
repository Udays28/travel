import Booking from '../models/Booking.js';
import Package from '../models/TourPackage.js';
import User from '../models/User.js';

export const createBooking = async (req, res) => {
  try {
    const { packageId, startDate, numberOfPeople } = req.body;
    const userId = req.user._id;

    const tourPackage = await Package.findById(packageId);
    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const totalPrice = tourPackage.price * numberOfPeople;

    const newBooking = new Booking({
      user: userId,
      package: packageId,
      startDate,
      numberOfPeople,
      totalPrice,
      status: 'pending'
    });

    const savedBooking = await newBooking.save();

    await User.findByIdAndUpdate(userId, {
      $push: { bookings: savedBooking._id }
    });

    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking: savedBooking 
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
};

export const getBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate('package', 'name price')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('package', 'name price duration')
      .populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Error fetching booking' });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking status updated successfully', booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Error updating booking status' });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Error cancelling booking' });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate('package', 'name price')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Error fetching user bookings' });
  }
};

export const getVendorBookings = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const bookings = await Booking.find({ 'package.vendor': vendorId })
      .populate('package', 'name price')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching vendor bookings:', error);
    res.status(500).json({ message: 'Error fetching vendor bookings' });
  }
};