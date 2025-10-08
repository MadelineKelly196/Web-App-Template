import { createApp } from "./app.js";
import * as dbService from "./dbService.js";
import env from "dotenv";
import path from "path";

const app = createApp(dbService);

// Load the root .env file
const envPath = path.resolve(import.meta.dirname, '../.env');
env.config({ path: envPath });

const port = process.env.VITE_EXPRESS_PORT || 3000;

// Use FRONTEND_URL if set, otherwise default to localhost
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// Set CORS headers to allow requests from the frontend
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', FRONTEND_URL)
    next()
})

//listen on given port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});