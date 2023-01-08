import { Router } from "express";
const departmentRouter=Router()
import departmentNames from '../models/departments.js'

departmentRouter.get('/',async(req,res) =>{
    try{
        const names=await departmentNames.find()
        res.json(names)
    } catch(err){
        res.send("Error : "+err)
    }
})
export default departmentRouter