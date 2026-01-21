const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Bangles', 'Sets']
    },
    material: {
        type: String,
        required: true,
        enum: ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'Diamond', 'Gemstone']
    },
    gemstone: {
        type: String, // e.g. "Ruby", "Emerald", "Sapphire", "None"
        default: 'None'
    },
    occasion: {
        type: String, // e.g. "Wedding", "Daily Wear", "Party", "Gift"
    },
    images: [{
        url: String,
        alt: String
    }],
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    isNewArrival: {
        type: Boolean,
        default: false
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
