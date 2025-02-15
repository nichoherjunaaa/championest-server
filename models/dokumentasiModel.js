import mongoose from 'mongoose'

var dokumentasiSchema = new mongoose.Schema({
    gambar: {
        type: String,
        default : null,
    }
});

const Dokumentasi = mongoose.model('Dokumentasi', dokumentasiSchema);

export default Dokumentasi;