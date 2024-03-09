import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const getUsersFromDB = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const insertUserIntoDB = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username, password },
    });

    if (user) {
      console.log(process.env.JWT_SECRET);
      // Autentificare reușită; generăm un token JWT
      const token = jwt.sign(
        { userId: user.dataValues.id, username: user.dataValues.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const userType = user.dataValues.type;
      return res.status(200).json({ userType, token });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export { getUsersFromDB, insertUserIntoDB, loginUser };
