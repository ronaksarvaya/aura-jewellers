require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            retryWrites: true,
            w: 'majority',
        });
console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Start server after successful connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        console.error('Full error:', err);
        console.error('Troubleshooting:');
        console.error('1. Check Atlas Network Access - add your IP or 0.0.0.0/0');
        console.error('2. Verify MONGO_URI in .env (user/pass/dbname correct)');
        console.error('3. Disable VPN/firewall temporarily');
        console.error('4. Ensure cluster is not paused');
        process.exit(1);
    }
};

connectDB();

const productRoutes = require('./routes/productRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Routes
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);
app.get('/', (req, res) => {
    res.send('Aura Jewellery API is running...');
});

// Server starts after DB connect (inside connectDB)
