import { mongoose } from "mongoose";

const areaWiseDataStoreSchema = new mongoose.Schema({

    state: String,
    district: String,
    subDistrict: String,
    village: String,
    pinCode: Number,
    feedback: {
        type: String,
        default: false
    },
    problem: {
        type: String,
        default: false
    },
    msg: String,
    hashTags: Array,
    phoneNumber:{
        type:Number,
        default:0
    },
    email:{
        type:String,
        default:null
    }
})
const areaDataStore = mongoose.model('areaDataStore', areaWiseDataStoreSchema);
export default areaDataStore