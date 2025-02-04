import mongoose from 'mongoose';

var produkSchema = new mongoose.Schema({
    nama:{
        type:String,
        required:[true, 'Nama harus diisi']
    },
    harga:{
        type:String,
        required:[true, 'Harga harus diisi']
    },
    deskripsi:{
        type:String,
        required:[true, 'Deskripsi harus diisi']
    },
    stok:{
        type:Number,
        required:[true, 'Stok harus diisi']
    },
    gambar:{
        type:String,
        required:[true, 'Gambar harus diisi']
    }
});

const Produk = mongoose.model('produk', produkSchema);

export default Produk;