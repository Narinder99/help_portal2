import { mongoose } from "mongoose";

const departmentSchema = new mongoose.Schema({
    ministries: [
        {
            ministries: String
        }
    ]
})
const departmentNames= mongoose.model('department',departmentSchema);
export default departmentNames