import mongoose from 'mongoose';

var newsSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        unique: true,
    },
    deskripsi: {
        type: String,
        required: true,
    },
    gambar : {
        type: String,
        default : null
    }
});

//Export the model
const News = mongoose.model('News', newsSchema);

export default News;