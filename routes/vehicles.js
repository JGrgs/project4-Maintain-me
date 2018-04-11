const
    express = require('express'),
    vehiclesRouter = new express.Router(),
    Vehicle = require('../models/Vehicle.js'),
    { verifyToken } = require('../serverAuth.js'),
    vehiclesCtrl = require('../controllers/vehicles.js')

vehiclesRouter.get('/', vehiclesCtrl.index)

vehiclesRouter.use(verifyToken)

vehiclesRouter.post('/', vehiclesCtrl.create)
vehiclesRouter.delete('/:id', vehiclesCtrl.destroy)
vehiclesRouter.get('/:id/maintenance', vehiclesCtrl.showMaintenance)
vehiclesRouter.post('/maintenance/:id', vehiclesCtrl.createMaintenance)
vehiclesRouter.post('/:id/maintenance/:mntncId', vehiclesCtrl.updateMaintenance)
vehiclesRouter.delete('/:id/maintenance/:mntncId', vehiclesCtrl.destroyMaintenance)

module.exports = vehiclesRouter

