const User = require('../models/User.js')
const Vehicle = require('../models/Vehicle.js')
const signToken = require('../serverAuth.js').signToken

const axios = require('axios')
const httpClient = axios.create()
'use strict';
const apiKey = "kFaB_z1hMIv1gWsKbcBtPREokaRfGfSV5Uj9etPRqbWaxkb3x9dGvSw2bx3giroUD8dVi-1V8mwJXy4HTBtKfyo0J03oJEP9XmOSP9t2N4rO79o7KBRbskk8OYvOWnYx"
 
const yelp = require('yelp-fusion');
 
const client = yelp.client(apiKey);

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
	},

	showLocation: (req, res) => {
		const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.user.city},${req.user.zipCode}&key=${process.env.API_KEY}`
		
		// sample array of businesses from yelp (you may need to adjust for difference in data structure)
		// const businesses = [
		// 	{ name: "GA SM", address: "1520 2nd St, Santa Monica, CA" },
		// 	{ name: "GA DTLA", address: "360 E 2nd St #400, Los Angeles, CA 90012" }
		// ]

		// // create an array of httpClient promises based on the address of each business
		// const geolocationRequests = businesses.map((b) => {
		// 	const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${b.address}&key=${process.env.API_KEY}`
		// 	return httpClient({method: 'get', url: apiUrl})
		// })

		// // you get back an array of apiResponses (each with a .data) when all of these requests have come back.
		// Promise.all(geolocationRequests).then(results => {
		// 	const businessesWithCoordinates = businesses.map((b, index) => {
		// 		return {
		// 			...b,
		// 			lat: results[index].data.results[0].geometry.location.lat,
		// 			lng: results[index].data.results[0].geometry.location.lng,
		// 		}
		// 	})
		// 	console.log(businessesWithCoordinates)
		// 	// res.json()
		// })


		
		httpClient({method: 'get', url: apiUrl}).then((apiResponse) =>{
			res.json(apiResponse.data)
		})
		  
	},

	getYelp:(req, res) => {
		client.search({
			term:'mechanic',
			location: `${req.user.city}`
		  }).then(response => {
			res.json(response.jsonBody.businesses);
		  }).catch(e => {
			res.json(e);
		  });
	}
}
