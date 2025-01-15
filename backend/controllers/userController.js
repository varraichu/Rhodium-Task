const userData = require('../models/usersModel');

exports.signup = async (req,res) => {
    try{
        const {email, password} = req.body;

        if(!email){
            return res.status(400).json({message: "Please enter email"})
        }
        if(!password){
            return res.status(400).json({message: "Please enter password"})
        }
        
        const existingUser = await userData.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"})
        }

        const newUser = new userData({
            email,
            password
        })
        const userSignup = await newUser.save();
        res.status(201).json(userSignup);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

exports.login = async (req,res) =>{
    try{
        const {email, password} = req.body;

        if(!email){
            return res.status(400).json({message: "Please enter email"})
        }
        if(!password){
            return res.status(400).json({message: "Please enter password"})
        }
        
        const existingUser = await userData.findOne({email});
        if(!existingUser){
            return res.status(400).json({message: "User does not exist"})
        }
        
        if(password === existingUser.password){
            res.status(200).json({message: "Login Successful"});
        }
        else{
            return res.status(400).json({message: "Wrong password"})
        }
    }
    catch(error){
        console.error("error");
        res.status(500).json({message:error.message})
    }
};