import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  verificationCode:{
    type:String,
  },
  verificationExpiry:{
    type:Date,
  },
  verified:{
    type:Boolean,
    default:false
  },
  assistantName:{
    type:String
  },
  assistantImage:{
    type:String
  },
  history:[
    {
      type:Object
    }
  ]
},{
  timestamps:true
})

export const User = mongoose.model('user', userSchema);
