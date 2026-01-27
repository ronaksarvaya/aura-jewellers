require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// const productRoutes = require('./routes/productRoutes'); // Removed as file does not exist
const chatRoutes = require('./routes/chatRoutes');

// Routes
app.use('/api/chat', chatRoutes);
app.get('/', (req, res) => {
    res.send('Aura Jewellery API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
