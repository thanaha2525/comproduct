import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';

export const signUp = async (req, res) => {
    try {
      // Getting the Request Body
      const { username, email, password, roles } = req.body;
      // Creating a new User Object
      const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
      });
  
      // checking for roles
      if (req.body.roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
      } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
      }
  
      // Saving the User Object in Mongodb
      const savedUser = await newUser.save();
  
      // Create a token
      const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400, // 24 hours
      });
  
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };

export const signIn = async (req,res) =>{
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if(!userFound){
        return res.status(400).json({message: "User no found plase register"})
    }

    const matchPassword = await User.comparepassword(req.body.password, userFound.password)
   
    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password or Email'})

    console.log(userFound)

    const token = jwt.sign({id: userFound._id},config.SECRET, {
        expiresIn: 86400 // one day
    })
    res.json({token: token})
} 