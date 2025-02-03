import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/dbConnection.js';
import authRoute from './routes/authRoute.js';

dotenv.config();

const app = express();
app.use(express.json());
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
app.use('/api/auth', authRoute);

startServer();
