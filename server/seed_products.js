require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
    {
        name: "Classic Gold Solitaire Ring",
        description: "A timeless elegant ring featuring a single brilliant-cut diamond set in 18k Gold.",
        price: 45000,
        category: "Rings",
        material: "Gold",
        gemstone: "Diamond",
        occasion: "Wedding",
        stock: 10,
        isBestSeller: true,
        images: [{ url: "https://placehold.co/400x400/gold/white?text=Gold+Ring", alt: "Gold Solitaire Ring" }]
    },
    {
        name: "Silver Charm Bracelet",
        description: "Delicate sterling silver bracelet with heart-shaped charms.",
        price: 3500,
        category: "Bracelets",
        material: "Silver",
        gemstone: "None",
        occasion: "Gift",
        stock: 25,
        isNewArrival: true,
        images: [{ url: "https://placehold.co/400x400/silver/white?text=Silver+Bracelet", alt: "Silver Bracelet" }]
    },
    {
        name: "Ruby Pendant Necklace",
        description: "Stunning red ruby pendant surrounded by small zircons on a gold chain.",
        price: 12000,
        category: "Necklaces",
        material: "Gold",
        gemstone: "Ruby",
        occasion: "Party",
        stock: 5,
        images: [{ url: "https://placehold.co/400x400/red/white?text=Ruby+Necklace", alt: "Ruby Necklace" }]
    },
    {
        name: "Platinum Wedding Band",
        description: "Sleek and modern platinum band with a brushed finish.",
        price: 55000,
        category: "Rings",
        material: "Platinum",
        gemstone: "None",
        occasion: "Wedding",
        stock: 8,
        images: [{ url: "https://placehold.co/400x400/e5e4e2/black?text=Platinum+Ring", alt: "Platinum Ring" }]
    },
    {
        name: "Emerald Drop Earrings",
        description: "Elegant drop earrings featuring natural emeralds in a silver setting.",
        price: 8500,
        category: "Earrings",
        material: "Silver",
        gemstone: "Emerald",
        occasion: "Party",
        stock: 12,
        isBestSeller: true,
        images: [{ url: "https://placehold.co/400x400/green/white?text=Emerald+Earrings", alt: "Emerald Earrings" }]
    },
    {
        name: "Rose Gold Bangle Set",
        description: "Set of 4 stackable bangles in 18k Rose Gold plating.",
        price: 6000,
        category: "Bangles",
        material: "Rose Gold",
        gemstone: "None",
        occasion: "Daily Wear",
        stock: 20,
        images: [{ url: "https://placehold.co/400x400/b76e79/white?text=Rose+Gold+Bangles", alt: "Rose Gold Bangles" }]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        const count = await Product.countDocuments();
        if (count > 0) {
            console.log(`Database already has ${count} products. Skipping seed.`);
            process.exit(0);
        }

        console.log('Seeding products...');
        await Product.insertMany(sampleProducts);
        console.log('Successfully seeded product catalog!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
