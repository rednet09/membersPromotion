const User = require("../models/Users");

const registerUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Name and email are required.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send("User already registered.");

  const newUser = new User({ name, email });
  await newUser.save();

  await handlePromotions();

  res.status(201).send(newUser);
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};

const handlePromotions = async () => {
  const pool1Users = await User.find({ pool: 1 }).sort({ joinedAt: 1 });

  if (pool1Users.length >= 14) {
    const firstPromotedUser = pool1Users[0];
    firstPromotedUser.pool = 2;
    firstPromotedUser.wallet = 14;
    await firstPromotedUser.save();

    const remainingPool1Users = await User.find({ pool: 1 })
      .sort({ joinedAt: 1 })
      .skip(14);

    if (remainingPool1Users.length >= 8) {
      secondPromotedUser.pool = 2;
      secondPromotedUser.wallet = 22;
      await secondPromotedUser.save();
    }
  }

  const pool2Users = await User.find({ pool: 2 }).sort({ joinedAt: 1 });

  if (pool2Users.length >= 8) {
    const remainingPool2Users = pool2Users.slice(8);

    if (remainingPool2Users.length >= 8) {
      const thirdPromotedUser = remainingPool2Users[7];
      thirdPromotedUser.pool = 3;
      thirdPromotedUser.wallet = 30;
      await thirdPromotedUser.save();
    }
  }
};

module.exports = {
  registerUser,
  getUsers,
};
