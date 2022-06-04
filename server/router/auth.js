const express = require('express');
const router = express.Router();
require('../db/conn.js');
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');

// jwt always used after login to check the autherized user
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
    res.send(`hello world from the server router.js`);
})


// signup
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.send(422).json({
            error: "please fill the details properly"
        });
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "incorrect passwprd" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();

            res.status(201).json({ message: "user registered successfully" });
        }

    } catch (err) {
        console.log(err);

    }

});

// login
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send(422).json({
                error: "please fill the details properly"
            });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {

            const isMatch = await bcrypt.compare(password,userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwttoken",token,{
                expires:new Date(Date.now() + 25890000),
                httpOnly:true
            });

            if(isMatch)
            {
                res.json({message:"sign in successfully"});
            }else{
                res.status(400).json({error : "invalid credentials"})
            }

        }else{
            res.status(400).json({error : "invalid credentials"})
        }
    } catch (err) {
        console.log(err);
    }

})


module.exports = router;