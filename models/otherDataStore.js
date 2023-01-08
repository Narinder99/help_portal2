import { mongoose } from "mongoose";

//Help Portal Usage Type Other
const otherSchema = new mongoose.Schema({
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
const otherDataStore=mongoose.model("otherDataStore",otherSchema)
export default otherDataStore