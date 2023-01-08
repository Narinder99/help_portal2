import { Router } from "express";
const submitData = Router()
import areaData from '../models/areaWiseDataStore.js'
import departmentData from '../models/departmentWiseDataStore.js'
import otherData from '../models/otherDataStore.js'

submitData.post('/areaData', async (req, res) => {
    try {
        const data = new areaData()


        data.state = req.body.state
        data.district = req.body.district
        data.subDistrict = req.body.subDistrict
        data.village = req.body.village
        data.pinCode = req.body.pinCode
        if (req.body.feedback) {
            data.feedback = true
        } else {
            data.problem = true
        }
        data.msg = req.body.msg
        data.hashTags = req.body.hashTags
        const saveData = await data.save()
        res.json(saveData)
    } catch (err) {
        res.send("Error : " + err)
    }
})

submitData.post('/departmentData',async(req,res)=>{
    try{
        const data=new departmentData()
        data.ministries=req.body.ministries
        data.area=req.body.area
        data.departmentInfo=req.body.departmentInfo
        data.feedback=req.body.feedback
        data.problem=req.body.problem
        data.msg=req.body.msg
        data.hashTags=req.body.hashTags

        const saveData= await data.save()
        res.json(saveData)
    }catch(err){
        res.send("Error : "+err)
    }
})

submitData.post('/otherData',async(req,res)=>{
    try{
        const data=new otherData()
        data.feedback=req.body.feedback
        data.problem=req.body.problem
        data.msg=req.body.msg
        data.hashTags=req.body.hashTags

        const saveData= await data.save()
        res.json(saveData)
    }catch(err){
        res.send("Error : "+err)
    }
})

export default submitData