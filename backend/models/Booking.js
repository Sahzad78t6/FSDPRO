const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    bookingDate: { type: Date, required: true },
    bookingTime: { type: String, required: true },
    guestsCount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Requested", "Confirmed", "Completed", "Cancelled"],
        default: "Requested"
    },
    specialRequests: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
