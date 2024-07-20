import UserModel from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import  jsonwebtoken from "jsonwebtoken";


const registerController = async (req , res)=>{
    try {
        const existingUser = await UserModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'user is already exist'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password , salt);
        req.body.password = hashedpassword;

        const user = new UserModel(req.body)
        await user.save()
        return res.status(201).send({
            success : true,
            message : 'user registered successfully',
            user,
        });
        
    } catch (error) {
        console.error('Error in register API:', error);
        return res.status(500).send({
            success: false,
            message: 'Error in register API',
            error: error.message,
        });
        
    }
};
const loginController = async (req ,res)=>{
    try {
        const existingUser = await UserModel.findOne({email : req.body.email})
        if(!existingUser){
            return res.status(404).send({
                success : false,
                message : 'user not found'

            })
        }
        if(existingUser.role !== req.body.role){
            return res.status(500).send({
                success:false,
                message:'role doesnt match'
            });
        }
        const comperedPassword = await bcrypt.compare(req.body.password  ,  existingUser.password)
        if(!comperedPassword){
            return res.status(500).send({
                success:false,
                message:'user not found'
            })
        }
        const token = jsonwebtoken.sign({userId :  existingUser._id} , process.env.JWT_SECRET , {expiresIn:'5d'})
        res.status(200).send({
            success : true,
            message:'successfully login',
            token,
            existingUser,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error invalid login api',
            error
        });
        
    }
};
const currentuserController = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).send({
                success: false,
                message: 'User ID is required',
            });
        }

        const curruser = await UserModel.findOne({ _id: userId });

        if (!curruser) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'User fetched successfully',
            user: curruser,
        });

    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).send({
            success: false,
            message: 'Unable to fetch user',
            error: error.message, // Sending just the error message for security reasons
        });
    }
};

export {registerController , loginController , currentuserController };
