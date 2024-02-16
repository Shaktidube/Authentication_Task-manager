const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //CHECKING IF USER IS ALREADY EXISTS
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
    console.log(error.message);
    }
    if(existingUser){
        return res.status(400).json({message:"user already exists"})
    }
    //HASING A PASSWORD
    const hashedPassword = await bcrypt.hash(password,10);
    //CREATING A NEW USER
    const user = new User({
      name,
      email,
      password:hashedPassword,
    });
    await user.save();
    return res.status(201).json({ message: user });
  } catch (error) {
    console.log(error.message);
  }
};

exports.login = async (req,res) => {
  const {email,password} = req.body;
  //checking if user is already exists
  let existingUser;
  try {
    existingUser = await User.findOne({email})
  } catch (error) {
    console.log(error.message);
  }

  if(!existingUser){
    return res.status(404).json({message:"User does not exists"})
  }
  //cheking the password is corrct or not
  const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

  if(!isPasswordCorrect){
    return res.status(400).json({message:"Invalid password"})

  }
  //creating a token
  const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRETE,{expiresIn:"2h"})
  res.cookie(String(existingUser.id),token,{
    path:"/",
    expires:new Date(Date.now()+1000 * 30),
    httpOnly:true,
    samSite:"lax",
  })
  return res.status(200).json({message:"Successfully Loged in"})

}
