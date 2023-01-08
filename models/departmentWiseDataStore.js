import { mongoose } from "mongoose";

const departmentSchema= new mongoose.Schema({
    ministries:String,
    area:String,
    departmentInfo:String,
    feedback: {
        type: String,
        default: false
    },
    problem: {
        type: String,
        default: false
    },
    msg:String,
    hashTags:Array,
    phoneNumber:{
        type:Number,
        default:0
    },
    email:{
        type:String,
        default:null
    }
})
 const departmentDataStore=mongoose.model('departmentDataStore',departmentSchema)
 export default departmentDataStore