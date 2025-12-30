import {User} from "../models/user.model.js";
 

const registerUser=async (req,res) => {

    try {
        const {username,email,password}=req.body;

        // Basic validation
        if(!username || !email || !password || typeof password !== 'string' || password.trim().length === 0){
            return res.status(400).json({message:"All fields are required!"})
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        const existing = await User.findOne({ email: normalizedEmail });
        if(existing){
            return res.status(400).json({message:"User already exists!"})
        }

        const user = await User.create({ username, email: normalizedEmail, password });

        res.status(201).json({message:"User registered successfully",user:{id:user._id,email:user.email,username:user.username}});
    } catch(error){
        res.status(500).json({message:"Internal server error",error: error.message})
    }

};


const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || typeof password !== 'string' || password.trim().length === 0){
            return res.status(400).json({message:"Email and password are required!"});
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });

        if(!user) return res.status(404).json({message:"User not found!"});

        if(!user.password || typeof user.password !== 'string'){
            return res.status(500).json({message:"User has no password hash stored"});
        }

        // Debug: verify comparison context (no sensitive data logged)
        console.log("auth:login", {
            email: normalizedEmail,
            hasCompare: typeof user.comparePassword === 'function',
            storedHashPrefix: typeof user.password === 'string' ? user.password.slice(0, 4) : null,
            candidateLen: typeof password === 'string' ? password.length : null
        });

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(401).json({message:"Invalid credentials!"});

        res.status(200).json({message:"Login successful",user:{id:user._id,email:user.email,username:user.username}});
    } catch(error){
        res.status(500).json({message:"Internal server error",error: error.message}) 
    }
}


const logoutUser=async(req,res)=>{
    try{
        const{ email }=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        res.status(200).json({message:"Logout successful"});
    }catch(error){
        res.status(500).json({message:"Internal server error",error: error.message});
    }
}


export{
    registerUser,loginUser,logoutUser
};