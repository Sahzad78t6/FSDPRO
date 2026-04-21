require("dotenv").config();
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");

const restaurants = [
    {
        name: "Hotel Grand",
        description: "Premium dining experience",
        image: "https://b.zmtcdn.com/data/pictures/0/92020/0307c6fdb751054fb51f876bb913cc16_o2_featured_v2.jpg",
        rating: 4.1,
        cuisine: ["Biryani", "Hyderabadi", "Chinese"],
        location: "Nellore",
        avgPrice: 500,
        isDelivery: true,
        isDiningOut: true,
        menu: [
            { name: "Special Biryani", price: 250, category: "Biryani" },
            { name: "Chicken 65", price: 180, category: "Staters" }
        ]
    },
    {
        name: "Burger King",
        description: "Best burgers in town",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/10/3/e531b669-397c-4a40-8f60-50868537c098_23734.JPG",
        rating: 4.5,
        cuisine: ["Burgers", "Fast Food"],
        location: "Nellore",
        avgPrice: 300,
        isDelivery: true,
        isDiningOut: false,
        menu: [
            { name: "Whopper", price: 150, category: "Burger" },
            { name: "Fries", price: 80, category: "Sides" }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB for seeding...");
        await Restaurant.deleteMany({});
        await Restaurant.insertMany(restaurants);
        console.log("Data seeded successfully!");
        process.exit();
    } catch (err) {
        console.error("Error seeding data:", err);
        process.exit(1);
    }
};

seedDB();
