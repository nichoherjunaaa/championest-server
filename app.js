import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/dbConnection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
    await dbConnection();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
