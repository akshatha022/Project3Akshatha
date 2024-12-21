const bcryot = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = 'your_jet_secret';
const signup = async(req, res) =>{
    try{
        const{email,password}=req.bosy;
        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }
        if(await User.findone({email})){
            return res.status(400).json({message: 'Email and Password are required'});
        }
        if(await User.findone({email,})){
            return res.status(400).json({message: 'User already exists'})
        }
        const handshedpassword = await bcrypt.hash(password,10);
        const user = new user({email,password:handshedpassword});
        await user.save();

        res.status(201).json({message: 'user created'});
        }catch(error){
            res.status(500).json({message: 'Internal server error'})
        }   
     };
     const signin = async (req,res) =>{
        try{
            const user = await user.findone({email});

            if(!user || !(await bcrypt.compare(password,user.password))){
                return res.status(400).json({message: 'Invalid credentials'});
            }
            const token = jwt.sign({email},JWT_SECRET,{expiresIn: '1h'});
            res.json({token});
        }catch(error){
            res.status(500).json({message: 'Internal server error'});

        }

     };
     module.exports={signup,signin};
 
    
