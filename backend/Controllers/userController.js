const User=require('../Models/userModel');
const bcrypt=require('bcryptjs');
const validator=require('validator');
const jwt=require('jsonwebtoken');

const createToken=(id)=>{
    const jwtkey=process.env.JWT_SECRET_KEY;
    return jwt.sign({id},jwtkey,{expiresIn:"3d"});
}
const register = async(req,res)=>{
    const {name,email,password}=req.body;
try {
    let user=await User.findOne({email: email});
    if(!name){
        return res.status(403).json({
            message:"Name is required",
            error:true
        });
    };
    if(!email){
        return res.status(403).json({
            message:"Email is required",
            error:true
        });
    }else if(!validator.isEmail(email)){
        return res.status(403).json({
            message:"Invalid email",
            error:true
        });
    }
    if(!password){
        return res.status(403).json({
            message:"Password is required",
            error:true
        });
    }else if(!validator.isStrongPassword(password)){
        return res.status(403).json({
            message:"Plz enter strong password",
            error:true
        })
    }
    if(user){
        return res.status(208).json({
            message:"User already exists",
            error:true
        });
    }

    user=new User({name,email,password});
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    await user.save();
    const token=createToken(user._id);

    res.status(201).json({_id:user._id,name,email,token,error:false});
} catch (error) {
    console.log(error);
    return res.status(500).json({
        message:"Something went wrong",
        error: true
    })
}
};
const login = async(req, res) => {
    const {email,password}=req.body;
    if(!email){
        return res.status(403).json({
            message:"Email is required",
            error: true
        });
    }
    if(!password){
        return res.status(403).json({
            message:"Password is required",
            error: true
        });
    }
    try {
        let user=await User.findOne({email:email});
        if(!user) return res.status(404).json({message:"User not found",error:true});

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json({
            message:"Invalid email or password",
            error:true
        });

        const token=createToken(user._id);
        res.status(201).json({
            message:"Succefully login",
            _id:user._id,name:user.name,email,token,
            error:false
        });

    } catch (error) {
        res.status(500).json({
            message:"Somthing went wrong",
            error: true
        })
    }
}

const findUser=async (req, res) => {
    const userId=req.params.id;
    try {
        const user = await User.findById(userId);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
};

module.exports ={register,login,findUser,getAllUsers}