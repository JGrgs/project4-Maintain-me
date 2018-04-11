const
    mongoose = require('mongoose'),
    maintenanceSchema = new mongoose.Schema({
        title: String,
        note: String,
        dueDate: Date,
        dueAt: Number
        
    })
    vehicleSchema = new mongoose.Schema({
        make: String,
        model: String,
        year: Number,
        image: String,
        mileage: Number,
        maintenance: [maintenanceSchema],
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    })

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle