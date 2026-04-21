const express = require("express");
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");
const router = express.Router();

// Create Booking (Dining Out)
router.post("/", auth, async (req, res) => {
    try {
        const { restaurant, bookingDate, bookingTime, guestsCount, specialRequests } = req.body;
        const newBooking = new Booking({
            user: req.user.id,
            restaurant,
            bookingDate,
            bookingTime,
            guestsCount,
            specialRequests
        });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user bookings
router.get("/my-bookings", auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate("restaurant", "name location image");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
