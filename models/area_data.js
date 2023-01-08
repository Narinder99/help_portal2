import {mongoose} from 'mongoose'


const areaSchema = new mongoose.Schema({
    districts: [
        {
            districtName: String,
            subDistricts: [
                {
                    subDistrictName: String,
                    villages: [
                        {
                            villageName: String
                        }
                    ]
                }
            ]
        }]
})
const areas= mongoose.model('area', areaSchema)
export default areas