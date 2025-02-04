import mongoose from 'mongoose';

var produkSchema = new mongoose.Schema({
    nama:{
        type:String,
        required:[true, 'Nama harus diisi'],
        unique:[true, 'Nama sudah terdaftar']
    },
    harga:{
        type:Number,
        required:[true, 'Harga harus diisi']
    },
    deskripsi:{
        type:String,
        required:[true, 'Deskripsi harus diisi']
    },
    stok:{
        type:Number,
        default : 0
    },
    gambar:{
        type:String,
        default : null
    }
});

const Produk = mongoose.model('produk', produkSchema);

export default Produk;