const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://RohanGupta:pL4iwhTNjRESXKbw@cluster0.e34xyth.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
