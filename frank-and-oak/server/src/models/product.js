const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    short_description: String,
    thumbnail: String,
    animate_thumbnail: String,
    gallery: Object,
    price: Number,
    mrp: Number,
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_category'
    },
    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_categorys'
    },
    stock: {
        type: Boolean,
        default: true
    },
    brand: String,
    sizes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'add_size'
    }],
    colors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'add_color'
    }],
    status: {
        type: Boolean,
        default: true
    },
    deleted_at: {
        type: Date,
        default: null
    },
    created_at: Date,
    updated_at: {
        type: Date,
        default: Date.now
    }

});

productSchema.pre('insertOne', function () {
    this.created_at = new Date();
});

productSchema.pre('save', function () {
    this.created_at = new Date();
});
productSchema.pre('insertMany', function () {
    this.created_at = new Date();
});


const Product = mongoose.model('products', productSchema)

module.exports = Product;