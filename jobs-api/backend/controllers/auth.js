import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  /*  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempUser = { name, email, password: hashedPassword };
  if (!name || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter name, email and password" });
  } */
  const user = await User.create({ ...req.body });
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    "jwtsecret",
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token }); // returns username and token in the api response
};

export const login = async (req, res) => {
  res.send("Login user");
};
