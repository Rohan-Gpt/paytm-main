const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const userMiddleware = require("../middlewares/user");

const signupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string(),
  password: zod.string(),
});

const updationSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

// const findingSchema = zod.object({
//   firstName: zod.string().optional(),
//   lastName: zod.string().optional(),
// });

// const filterSchema = zod.object({
//   filter: zod.string().optional(),
// });

router.use(express.json());

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    res.send("bad inputs");
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    res.send("User already exists");
  }
  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  });

  const user_id = user._id;

  const account = await Account.create({
    userId: user_id,
    balance: Math.floor(Math.random() * 10000) + 1,
  });

  const token = jwt.sign({ user_id }, JWT_SECRET);

  res.json({
    messgae: "user created succesfully",
    balance: account.balance,
    token: token,
  });
});

router.put("/", userMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updationSchema.safeParse(body);

  if (!success) {
    res.send("bad inputs");
  }

  await User.updateOne(req.body, {
    id: req.user_id,
  });

  res.json({
    messgae: "Data updated successfully",
  });
});

// router.get("/bulk", async (req, res) => {
//   const filter = req.query.filter || "";
//   console.log("Filter:", filter); // Debugging line

//   const ALL_USERS = await User.find();
//   let filteredList = ALL_USERS.filter((x) => {
//     return x.firstname.includes(filter) || x.lastname.includes(filter);
//   });

//   console.log("Users:", filteredList); // Debugging line

//   res.json({
//     users: filteredList.map((filteredList) => ({
//       username: filteredList.username,
//       firstName: filteredList.firstname,
//       lastName: filteredList.lastname,
//       _id: filteredList._id,
//     })),
//   });
// });

// function normalizeData(req, res, next) {
//   if (req.method === "GET") {
//     req.normalizedData = req.query;
//   } else {
//     req.normalizedData = req.body;
//   }
//   next();
// }

// router.use(normalizeData);

// function validateData(schema) {
//   return (req, res, next) => {
//     const result = schema.safeParse(req.normalizedData);
//     if (!result.success) {
//       return res.status(400).json({ error: result.error.errors[0].message });
//     }
//     req.normalizedData = result.data;
//     next();
//   };
// }

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  console.log("Filter:", filter); // Debugging line

  const users = await User.find({
    $or: [
      { firstname: { $regex: filter, $options: "i" } },
      { lastname: { $regex: filter, $options: "i" } },
    ],
  });

  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      _id: user._id,
    })),
  });
});
module.exports = router;
