const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { JWT_secret } = require("../config");
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.create({
    username,
    password,
  });
  res.json({
    msg: "user created successfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.find({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign({ username }, JWT_secret);
    res.json({
      token,
    });
  } else {
    res.json({
      msg: "enter valid username or password",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const username = req.username;
  console.log(username)
  const courseID = req.params.courseId;
 await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourse: courseID,
      },
    }
  );
  res.json({
    msg: "purchased successfully.",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.username,
  });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourse,
    },
  });

  res.json({
    courses: user.purchasedCourse,
  });
});

module.exports = router;
