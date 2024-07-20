import mongoose from "mongoose";
const inventorySchema = new mongoose.Schema({
    invetoryType:{
        type : String,
        required :[true , 'inventory type required'],
        enum :['in' , 'out']
    },
    bloodgroup:{
        type : String,
        required:[true , 'blood gropup is required'],
        enum :['O-' , 'O+' , 'AB+' , 'AB-' , 'A+' , 'A-' , 'B+' , 'B-']

    },
    quantity:{
        type:Number,
        required:[true , 'blood quantity is required']
    },
    email:{
        type : String,
        required:[true ,' donar email is required']

    },
    organisation:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true , 'organisation is required']
    },
    hospital:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
        required :  function(){
            return this.invetoryType === "out"
        }
    },
    donar:{
        type : mongoose.Schema.Types.ObjectId,
        ref :'users',
        required : function(){
            return this.invetoryType === "in";
        }
    }

    
   

} , {timestamps:true}
);

export default  mongoose.model('inventory', inventorySchema);