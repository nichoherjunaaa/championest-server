// Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import {v2 as cloudinary} from 'cloudinary'
import mongoExpressSanitizer from 'express-mongo-sanitize';
dotenv.config();


// Database connection
import dbConnection from './config/dbConnection.js';

// Routes
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import dokumentasiRoute from './routes/dokumentasiRoute.js';
import newsRoute from './routes/newsRoute.js'; 
// Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';


const app = express();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(helmet());
app.use(mongoExpressSanitizer());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('/public'))
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
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/dokumentasi', dokumentasiRoute)
app.use('/api/v1/news', newsRoute)

// Middleware
app.use(notFound);
app.use(errorHandler);

startServer();
