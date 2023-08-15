import { Schema,model } from "mongoose";

const visitorSchema=new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    nID:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
	password:{
        type:String,
        required:true,
    },
	
	
},{timestamps:true})

const visitorModel=model("visitor",visitorSchema);
export default visitorModel;