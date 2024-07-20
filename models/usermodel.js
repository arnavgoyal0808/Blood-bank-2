import express from "express";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    role :{
        type :String,
        required :[true , 'user role is required'],
        enum:['admin' , 'organisation' , 'donar' , 'hospital']
    
    },
    name :{
        type : String,
        required : function(){
            if(this.role === 'donar' || this.role === 'admin'){
                return true;

            } 
            return false;
        }
    },
    organisationName :{
        type : String,
        required : function(){
            if(this.role === 'organisation'){
                return true;
            }
            return false;
        }
    },
    hospitalName :{
        type : String,
        required : function(){
            if(this.role === 'hospital'){
                return true;
            }
            return false;
        }
    },
    email :{
        type : String,
        required:[true ,'user email is require'],
        unique : true
    },
    password :{
        type : String,
        required:[true , 'user password is require']

    },
    website:{
        type : String,


    },
    address:{
        type : String,
        required:[true , 'user address is requied']

    },
    phone:{
        type:String,
        required :[true ,'user phone no .is required']
    },
} , {timestamps:true});
const UserModel = mongoose.model('users', userSchema);
export default UserModel;