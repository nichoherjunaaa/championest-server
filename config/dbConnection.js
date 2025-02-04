import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/technofest');
        console.log('MongoDB Connection Succeeded.');
    } catch (error) {
        console.error('Error in DB connection:', error);
    }
};

export default dbConnection;
