import mongoose from 'mongoose';
const {Schema} = mongoose

const singleProduct = Schema({
    name : {
        type: String,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    }, 
    price : {
        type: Number,
        required: true
    },
    product : {
        type : mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
})


const orderSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: [true, 'Total harga harus terisi']
    },
    status: {
        type: String,
        required: [true, 'Status harus terisi'],
        enum: ['Success', 'Pending', 'Failed'],
        default: 'Pending'
    },
    itemsDetail : [singleProduct],
    user : {
        type : mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    firstname : {
        type: String,
        required: [true, 'Nama depan harus diisi']
    },
    lastname : {
        type: String,
        required: [true, 'Nama belakang harus diisi']
    },
    phone : {
        type: String,
        required: [true, 'Nomor telepon harus diisi']
    },
    email : {
        type: String,
        required: [true, 'Email harus diisi'],
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;