const User = require('../models/User.js')
const Vehicle = require('../models/Vehicle.js')
const signToken = require('../serverAuth.js').signToken

module.exports = {

	index: (req, res) => {
		User.find({}, (err, users) => {
			res.json(users)
		})
	},


	show: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			res.json(user)
		})
	},


	create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({success: false, code: err.code})
			const token = signToken(user)
			res.json({success: true, message: "User created. Token attached.", token})
		})
	},

	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			Object.assign(user, req.body)
			user.save((err, updatedUser) => {
				res.json({success: true, message: "User updated.", user})
			})
		})
	},

	destroy: (req, res) => {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			Vehicle.remove({vehicle: req.params.id})
			res.json({success: true, message: "User deleted.", user})
		})
	},

	authenticate: (req, res) => {
		User.findOne({email: req.body.email}, (err, user) => {
			if(!user || !user.validPassword(req.body.password)) {
				return res.json({success: false, message: "Invalid credentials."})
			}

			const token = signToken(user)
			res.json({success: true, message: "Token attached.", token})
		})
	}
}
