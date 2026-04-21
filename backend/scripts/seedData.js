require("dotenv").config();
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");

const restaurants = [
    {
        name: "Babylon Brewery & Club",
        description: "Premium brewery and lounge",
        image: "https://b.zmtcdn.com/data/pictures/3/22295613/aade5a7026490f1cdc60f7f5dc094f78_featured_v2.jpg?output-format=webp",
        rating: 4.5,
        reviewsCount: 3166,
        cuisine: ["Continental", "Turkish", "Modern Indian"],
        location: "Nanakramguda, Hyderabad",
        avgPrice: 2500,
        isDelivery: false,
        isDiningOut: true,
        isNightLife: true,
        menu: [
            { name: "Beer Sampler", price: 600, category: "Drinks" }
        ]
    },
    {
        name: "Ajmeer Maharaj Hotel",
        description: "Authentic North Indian food",
        image: "https://b.zmtcdn.com/data/pictures/6/22032946/e91a99e72302d7e0813b78e4f0978d3a_featured_v2.jpg",
        rating: 4.0,
        reviewsCount: 850,
        cuisine: ["North Indian", "Biryani"],
        location: "Guntur",
        avgPrice: 400,
        isDelivery: true,
        isDiningOut: true,
        menu: []
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
