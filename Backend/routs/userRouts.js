const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const JWT_KEY = "shoaib123";

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({ message: "all fields are required" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ message: "user already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });
        const saveUser = await newUser.save()
        const token = jwt.sign({ id: saveUser._id }, JWT_KEY, { expiresIn: '1h' })
        res.status(201).json({ message: "Register successful", userDetails: saveUser, token: token });
    } catch (e) {
        res.status(505).json({ message: "sorry Registration Fail" });
        console.log(e)
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "invalid user or password" })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: "password or email is invalid " });
        }

        const token = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: "1h" });
        res.status(201).json({ status: "login successful" ,token :token});

    }

    catch (e) {
        console.log(e)
    }
});

router.get('/profile',auth,async(req,res)=>{
    res.json({
        message:"you are the right user ",
        userId:req.user.id
    })
})

module.exports = router