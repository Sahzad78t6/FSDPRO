const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const router = express.Router();

// Create Order (Requires Auth)
router.post("/", auth, async (req, res) => {
    try {
        const { restaurant, items, totalAmount, deliveryAddress } = req.body;
        const newOrder = new Order({
            user: req.user.id,
            restaurant,
            items,
            totalAmount,
            deliveryAddress
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user orders
router.get("/my-orders", auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate("restaurant", "name image");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
