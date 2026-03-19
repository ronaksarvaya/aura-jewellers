# MongoDB Atlas Connection Fix - Aura Jewellers Project

## Current Status
User approved plan to fix ECONNREFUSED error.

## Steps
- [x] Step 1: Improve mongoose connection handling in server/index.js (add options, async retry, detailed logging)
- [x] Step 2: Improve server/seed_products.js similarly
- [ ] Step 3: User verify Atlas Network Access (whitelist IP 0.0.0.0/0 or current IP)
- [ ] Step 4: User confirm .env MONGO_URI format: mongodb+srv://user:pass@cluster0.h5i2dye.mongodb.net/dbname?retryWrites=true&amp;w=majority
- [ ] Step 5: cd server &amp;&amp; npm install
- [ ] Step 6: Test server: cd server &amp;&amp; node index.js (check logs for connection success)
- [x] Step 7: Fixed dotenv path in code. Run `node server/seed_products.js` from root to seed.
- [ ] Step 8: Test API endpoints (e.g. http://localhost:5000/api/products)
- [ ] Step 9: cd ../client &amp;&amp; npm run dev
- [ ] Complete: Full stack running without connection error

## Next Action - Local MongoDB Setup
1. Install MongoDB: https://www.mongodb.com/try/download/community (Windows, as service)
2. Start MongoDB service (services.msc > MongoDB)
3. Copy server/.env.example to server/.env
4. cd server && node index.js
5. node seed_products.js
6. Test http://localhost:5000/api/products
Commands (copy-paste):
cd server ^&^& node index.js
