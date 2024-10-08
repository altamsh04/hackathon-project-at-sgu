import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

import { compare, hash } from "bcrypt";
import Auth from '../db/users.js';

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validUser = await Auth.findOne({ email });
    if (!validUser) {
      return res.status(401).json({ message: "Invalid user" });
    }

    const validPassword = await compare(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid user authentication" });
    }

    const token = sign(
      { id: validUser._id, username: validUser.username },
      '15a8157381e3c14eb2015c93674206a8416a861b8140994a8f07e99fcb646a59',
      { expiresIn: "24h" }
    );

    const { password: pwd, ...rest } = validUser._doc;

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      username: validUser.username,
      id: validUser._id
    });
    
  } catch (error) {
    return res.status(500).json({ message: "Error processing request", error });
  }
};

const logout = (req, res, next) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logout successful" });
  next();
};

const signup = async (req, res, next) => {
  try {
    const { username, password, email, mobile } = req.body;
    const newUser = new Auth({ username, password, email, mobile });

    newUser.password = await hash(password, 10);
    await newUser.save();
    res.status(201).json({ message: "SignUp Successful" });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error });
  }
  next();
};

export default { signin, logout, signup };
