const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

// Get all restaurants
router.get("/", async (req, res) => {
    try {
        const { type } = req.query; // delivery, diningOut, nightLife
        let filter = {};
        if (type === "delivery") filter.isDelivery = true;
        if (type === "diningOut") filter.isDiningOut = true;
        if (type === "nightLife") filter.isNightLife = true;

        const restaurants = await Restaurant.find(filter);
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single restaurant detail
router.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add restaurant (Admin only - for simplicity, adding without auth for now to allow populating data)
router.post("/", async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
