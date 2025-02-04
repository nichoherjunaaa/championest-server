import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
dotenv.config();


// Database connection
import dbConnection from './config/dbConnection.js';

// Routes
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    await dbConnection();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

app.get('/', (req, res) => {
    res.send('api ready');
});
// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/product', productRoute);

startServer();
