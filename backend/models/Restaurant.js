const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    cuisine: [{ type: String }],
    location: { type: String },
    avgPrice: { type: Number },
    openingHours: { type: String },
    isDelivery: { type: Boolean, default: true },
    isDiningOut: { type: Boolean, default: true },
    isNightLife: { type: Boolean, default: false },
    menu: [{
        name: { type: String },
        price: { type: Number },
        description: { type: String },
        image: { type: String },
        category: { type: String } // e.g., Biryani, Burger
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
