const express = require('express');
const router = express.Router();
const Product = require('../model/product')
router.get('/all-product', async (req, res) => {
    try {
        const product = await Product.find({});
        if (product.length === 0) {
            return res.status(404).json({ message: "there is no product in database" });
        }
        else {
            res.status(200).json({
                message: "product fetched",
                product
            })
        }
    } catch (e) {
        res.status(500).json({ msg: "error while fetching product" })
        console.log(e)
    }
});

router.get('/fetch-product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fetchProduct = await Product.findById(id)
        if(!fetchProduct){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"product found successfully",product:fetchProduct})
    } catch (e) {
        res.status(500).json({ msg: "error while fetching the product" })
        console.log(e)
    }
})

router.get('/fetch-product/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const fetchProduct = await Product.find({category})
        if(!fetchProduct){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"product found successfully",product:fetchProduct})
    } catch (e) {
        res.status(500).json({ msg: "error while fetching the product" })
        console.log(e)
    }
})

router.post('/add-product', async (req, res) => {
    try {
        const { pname, price, category } = req.body;
        const newProduct = new Product({
            pname,
            price,
            category
        });
        const saveProduct = await newProduct.save();
        if (saveProduct) {
            res.json({ message: "product added successful", saveProduct })
        }
    } catch (e) {
        res.status(500).json({ msg: "error while adding the product" })
        console.log(e)
    }

});

router.put('/update-product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { pname, price, category } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { pname, price, category }, { new: true, runValidators: true })
        if( !updatedProduct){
            return res.status(404).json({message:"product not updated"});
        }
        res.status(200).json({message:"product updated successfully",product:updatedProduct})
    } catch (e) {
        res.status(500).json({ msg: "error while updating the product" })
        console.log(e)
    }
})

router.delete('/delete-product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct){
            return res.status(404).json({message:"product not deleted"});
        }
        res.status(200).json({message:"product deleted successfully",product:deletedProduct})
    } catch (e) {
        res.status(500).json({ msg: "error while deleting the product" })
        console.log(e)
    }
})
module.exports = router