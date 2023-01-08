import { Router } from "express"
const areaRouter = Router()
import areas from '../models/area_data.js'
areaRouter.get('/', async (req, res) => {
  try {
    const area = await areas.find()
    res.json(area)
  } catch (err) {
    res.send('Error ' + err)
  }
})
areaRouter.post('/search', async (req, res) => {
  try {
    var area;
    if (req.body.state == 'none') {// all states
      area = await areas.aggregate([
        {
          $project: {
            _id:0,
            state: 1
          }
        }
      ])
    }
    else if(req.body.district=='none'){ // all districts in a particular state
      area = await areas.aggregate([
        {
          "$match": {
            "state": req.body.state
          }
        },
        {
          "$project": {
            districts: {
              "$map": {
                "input": "$districts",
                "in": {
                  districtName: "$$this.districtName",
                }
              }
            }
          }
        }
      ])
    }
    else if(req.body.subDistrict=='none'){ // all subDistricts in a particular district
      area = await areas.aggregate([
        {
          "$match": {
            "state": req.body.state
          }
        },
        {
          "$project": {
            _id: 0,
            districts: {
              "$map": {
                "input": {
                  "$filter": {
                    "input": "$districts",
                    "cond": {
                      "$eq": [
                        "$$this.districtName",
                        req.body.district
                      ]
                    }
                  }
                },
                "in": {
                  subDistricts: {
                    "$map": {
                      "input": "$$this.subDistricts",
                      "in": {
                        subDistrictName: "$$this.subDistrictName",
                      }
                    }
                  }
                }
              }
            }
          }
        }
      ])
    }
    else { // all villages in a particular subDistrict
      area = await areas.aggregate([
        {
          "$match": {
            "state": req.body.state
          }
        },
        {
          "$project": {
            _id: 0,
            state: 1,
            districts: {
              "$map": {
                "input": {
                  "$filter": {
                    "input": "$districts",
                    "cond": {
                      "$eq": [
                        "$$this.districtName",
                        req.body.district
                      ]
                    }
                  }
                },
                "in": {
                  districtName: "$$this.districtName",
                  subDistricts: {
                    "$map": {
                      "input": {
                        "$filter": {
                          "input": "$$this.subDistricts",
                          "cond": {
                            "$eq": [
                              "$$this.subDistrictName",
                              req.body.subDistrict
                            ]
                          }
                        }
                      },
                      "in": {
                        subDistrictName: "$$this.subDistrictName",
                        villages: "$$this.villages"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      ])
    }

    res.json(area)
  } catch (err) {
    res.send('Error ' + err)
  }
})

areaRouter.post('/', async (req, res) => {

  const area = new areas()


  try {
    const a1 = await area.save()
    res.json(a1)
  } catch (err) {
    res.send("error" + err);
  }
})

export default areaRouter