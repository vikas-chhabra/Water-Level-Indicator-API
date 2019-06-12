//import models required
const statsModel = require('../model/stats');

//define the routes

//to save water level percentage
exports.saveWaterLevelPercentage = (req, res) => {
    waterLevelPercentageFromUser = req.params.waterLevel;
    const Stat = new statsModel({
        waterLevelPercentage: waterLevelPercentageFromUser
    })
    statsModel.find()
        .then(stats => {
            if (stats.length >= 1) {
                statsModel.deleteOne({
                        _id: stats[0].id
                    })
                    .then(_ => {
                        saveWaterLevel(req,res,Stat);
                    })
                    .catch(error => {
                        res.stats(500).json({
                            status: 500,
                            response: false,
                            message: 'Something went wrong while saving the water level to the database',
                            error
                        })
                    })
            } else {
                saveWaterLevel(req,res,Stat);
            }
        })
}

//to get waterlevel percentage
exports.getWaterStats=(req,res)=>{
    statsModel.find()
    .then(stats=>{
        res.status(200).json({
            status:200,
            response:true,
            message:'Fethced Successfully',
            result:stats[0]
        })
    })
}

//common functions
saveWaterLevel = (req,res,Stat) => {
    return (
        Stat.save()
        .then(_ => {
            res.status(200).json({
                status: 200,
                response: true,
                message: 'Entry created successfully'
            })
        })
        .catch(error => {
            res.stats(500).json({
                status: 500,
                response: false,
                message: 'Something went wrong while saving the water level to the database',
                error
            })
        })
    )
}