const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const handleChat = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Fetch products for context
        // Optimizing by selecting only necessary fields
        const products = await Product.find({})
            .select('name description price category material gemstone occasion stock isNewArrival isBestSeller')
            .lean();

        // Construct System Prompt
        const systemInstruction = `
You are Aura, the AI Concierge for Aura Jewellery. Your goal is to assist customers in finding the perfect jewellery piece.
You have access to the current product catalog below. Use this information to answer user queries accurately.
- Suggest products based on user preferences (occasion, material, price, etc.).
- Provide specific details about products (price, material, gemstones).
- Be polite, professional, and helpful.
- If a user asks for something not in the catalog, politely inform them.
- Do NOT make up products. Only recommend what is in the catalog.
- Format prices in reasonable currency format (e.g. $100 or ₹8000 depending on context, assume ₹/INR if not specified).

Product Catalog:
${JSON.stringify(products, null, 2)}
`;

        const model = genAI.getGenerativeModel({
            model: "gemini-flash-lite-latest",
            // Using gemini-flash-lite-latest as confirmed in models.txt
            systemInstruction: systemInstruction
        });

        // Chat History Management
        // Convert frontend history format to Gemini format if necessary
        // Frontend sends: [{ role: 'user', parts: [{ text: '...' }] }, ...]
        // Gemini expects: { role: 'user' | 'model', parts: [{ text: '...' }] }
        const chat = model.startChat({
            history: history || [],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ text });

    } catch (error) {
        console.error('Chat Error:', error);
        res.status(500).json({ error: 'Failed to process chat request' });
    }
};

module.exports = { handleChat };
