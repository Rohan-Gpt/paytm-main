const express = require("express");
const userMiddleware = require("../middlewares/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const { default: mongoose } = require("mongoose");

const bodySchema = zod.object({
  to: zod.string(),
  amount: zod.number(),
});

router.get("/balance", userMiddleware, async (req, res) => {
  const user_id = req.user_id;
  console.log(user_id);
  const userBalance = await Account.findOne({
    userId: user_id,
  });
  console.log(userBalance);

  res.json({
    balance: userBalance.balance,
  });
});

router.post("/transfer", userMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { to, amount } = req.body;

  const fromAccount = Account.findOne({
    userId: req.user_id,
  }).session(session);

  if (fromAccount.balance < amount) {
    await session.abortTransaction();
    session.endSession();
    res.status(403).send("insufficient balance");
  }

  const toAccount = Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    session.endSession();
    res.status(404).send("User does not exist");
  }

  await Account.updateOne(
    { userId: req.user_id },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json("transaction successful");
  console.log("transaction successful");
});

module.exports = router;
