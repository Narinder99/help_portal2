import { Router } from "express";
const updateData = Router()
import areaData from '../models/areaWiseDataStore.js'
import departmentData from '../models/departmentWiseDataStore.js'
import otherData from '../models/otherDataStore.js'
import mongoosei from 'mongoose';
const mongoose = mongoosei

updateData.patch('/areaData/:id', async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const data = await areaData.findById(req.params.id)
            if (data == null) {
                res.json("Something went wrong!")
            }
            else {
                if (req.body.type == "phoneNumber") {
                    data.phoneNumber = req.body.phoneNumber
                }
                else if (req.body.type == "email") {
                    data.email = req.body.email
                }
                else{
                    console.log("Invalid Input")
                }
                const saveData = await data.save()
                res.json(saveData)
            }
        }
        else {
            res.json("invalid id")
        }
    } catch (err) {
        res.send("Error : " + err)
    }
})

updateData.patch('/departmentData/:id', async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const data = await departmentData.findById(req.params.id)
            if (data == null) {
                res.json("Something went wrong!")
            }
            else {
                if (req.body.type == "phoneNumber") {
                    data.phoneNumber = req.body.phoneNumber
                }
                else if (req.body.type == "email") {
                    data.email = req.body.email
                }
                else{
                    console.log("Invalid Input")
                }
                const saveData = await data.save()
                res.json(saveData)
            }
        }
        else {
            res.json("invalid id")
        }
    } catch (err) {
        res.send("Error : " + err)
    }
})

updateData.patch('/otherData/:id', async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const data = await otherData.findById(req.params.id)
            if (data == null) {
                res.json("Something went wrong!")
            }
            else {
                if (req.body.type == "phoneNumber") {
                    data.phoneNumber = req.body.phoneNumber
                }
                else if (req.body.type == "email") {
                    data.email = req.body.email
                }
                else{
                    console.log("Invalid Input")
                }
                const saveData = await data.save()
                res.json(saveData)
            }
        }
        else {
            res.json("invalid id")
        }
    } catch (err) {
        res.send("Error : " + err)
    }
})

export default updateData