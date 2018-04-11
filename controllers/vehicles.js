const Vehicle = require('../models/Vehicle.js')

module.exports = {

    index: (req, res) => {
        Vehicle.find({}, (err, allVehicles) => {
            if(err) return console.log(err)
            res.json(allVehicles)
        })
    },

    create: (req, res) => {
        Vehicle.create({...req.body, user: req.user}, (err, newVehicle) => {
            if(err) return console.log(err)
            res.json({success: true, message: "Vehicle added", vehicle: newVehicle})
        })
    },

    update: (req, res) => {
        Vehicle.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedVehicle) => {
            if(err) return console.log(err)
            res.json({success: true, message:"vehicle updated", vehicle: updatedVehicle})
        })
    },

    destroy: (req, res) => {
        Vehicle.findByIdAndRemove(req.params.id, (err, deletedVehicle) => {
            res.json({success: true, message: "Vehicle deleted", deletedVehicle})
        })
    },

    createMaintenance: (req, res) => {
        Vehicle.findById(req.params.id, (err, thatVehicle) => {
            thatVehicle.maintenance.push(req.body)
            thatVehicle.save((err) => {
                res.json(thatVehicle)
            })
            
        })
    },

    showMaintenance: (req, res) => {
        Vehicle.findById(req.params.id, (err, thatVehicle) => {
            res.json(thatVehicle)
        })
    },

    updateMaintenance: (req, res) => {
        Vehicle.findById(req.params.id, (err, thatVehicle) => {
           const maintenance = thatVehicle.maintenance.id(req.params.mntncId)
           Object.assign(maintenance, req.body)
           thatVehicle.save((err) => {
            res.json({success: true, message: "Maintenance updated", maintenance}) 
           })
            
        })
    },

    destroyMaintenance: (req, res) => {
        Vehicle.findById(req.params.id, (err, thatVehicle) => {
            const maintenance = thatVehicle.maintenance.id(req.params.mntncId)
            maintenance.remove()
            thatVehicle.save((err, savedVehicle) => {
                res.json({success: true, message: "maintenance saved", vehicle: savedVehicle})
            })
        })
    }
}