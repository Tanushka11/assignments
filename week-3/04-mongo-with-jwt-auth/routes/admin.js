const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course,User } = require("../db");
const {JWT_secret} = require("../config");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post('/signup', async (req, res) => {

    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const admin = Admin.create({
        username,
        password
    })
    res.json({
        msg: "admin created successfully"
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    /*
    jwts helps you save one database call such as is you want to log in then you dont need to hit
    database to authenticate its you, you will be verified by the token present to your local machine
    if it is signed by the secret then you will get acceses to dtabase to request further
    */
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.find({
        username,
        password 
    })
    if(user){
        const token =  jwt.sign(
            {username},JWT_secret
        )
        res.json({
            token
        });
    }else{
        res.status(403).json({
            msg: "enter correct username or password"
        })
    }
    

});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        msg: "course created successfully",
        courseID: newCourse._id
    })

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

module.exports = router;