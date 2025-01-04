import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'; 
import { errorHandler } from '../utils/error.js';  // Make sure this import exists
import jwt from 'jsonwebtoken'; 

//signup controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body; 
  const hashedPassword = bcryptjs.hashSync(password, 10); 
  const newUser = new User({ username, email, password: hashedPassword }); 

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" }); 
  } catch (error) {
    next(error); 
  }
};

//signin Controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body; 
  
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(403, 'Wrong Credentials'));
    }
  
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); 
    const { password: hashedPassword, ...rest } = validUser._doc; 
  
    res.cookie('token', token, { 
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }).status(200).json(rest); 
  } catch (error) {
    next(error); 
  }
};

export const google = async (req, res, next) => {
  try {
  
    // Check if the user exists in the database
    const user = await User.findOne({ email: req.body.email }); 

    if (user) {
      // Generate a JWT token for the existing user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // Exclude sensitive fields like passwords before responding
      const { password, hashedPassword, ...rest } = user._doc; 

      // Store the token in an HTTP-only cookie for 7 days and respond with user data
      res
        .cookie('token', token, {
          httpOnly: true, // Accessible only by the server
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7-day expiration
        })
        .status(200)
        .json(rest); // Send user data excluding sensitive fields
    } else {
      // Generate a random password for the new user
      const generatedPassword = Math.random().toString(36).slice(-8);

      // Hash the generated password for security
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Create a new user object with unique username and hashed password
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(), // Generate a unique username
        email: req.body.email, // Set user's email
        password: hashedPassword, // Store hashed password
        profilePicture: req.body.photo, // Set user's profile picture
      });

      // Save the new user to the database
      await newUser.save(); 

      // Generate a JWT token for the newly created user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET); 

      // Exclude sensitive fields like passwords before responding
      const { password, hashedPassword: hashedPassword2, ...rest } = newUser._doc; 

      // Store the token in an HTTP-only cookie for 7 days and respond with user data
      res
        .cookie('token', token, {
          httpOnly: true, // Accessible only by the server
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7-day expiration
        })
        .status(200)
        .json(rest); // Send user data excluding sensitive fields
    }
  } catch (error) {
    // Pass errors to the error-handling middleware
    next(error); 
  }
};

export const signout =(req,res)=>{
  res.clearCookie('token').status(200).json("Signout Sucess");
}