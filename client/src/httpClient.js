import axios from 'axios'
import jwtDecode from 'jwt-decode'

const httpClient = axios.create()

httpClient.getToken = function() {
	return localStorage.getItem('token')
}

httpClient.setToken = function(token) {
	localStorage.setItem('token', token)
	return token
}

httpClient.getCurrentUser = function() {
	const token = this.getToken()
	if(token) return jwtDecode(token)
	return null
}

httpClient.logIn = function(credentials) {
	return this({ method: 'post', url: '/api/users/authenticate', data: credentials })
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

httpClient.signUp = function(userInfo) {
	return this({ method: 'post', url: '/api/users', data: userInfo})
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

httpClient.logOut = function() {
	localStorage.removeItem('token')
	delete this.defaults.headers.common.token
	return true
	
}

httpClient.editUser = function(id, fields) {
	return this({method: 'patch', url: `/api/users/${id}`, data: fields})
}

httpClient.deleteUser = function(id) {
	return this({method: 'delete', url: `/api/users/${id}`})
}

httpClient.getVehicle = function() {
	return this({method: 'get', url:'/api/vehicles'})
}

httpClient.addVehicle = function(vehicleInfo) {
	return this({method: 'post', url:'/api/vehicles', data: vehicleInfo})
}

httpClient.deleteVehicle = function(id){
	return this({method: 'delete', url: `/api/vehicles/${id}`})
}

httpClient.getMaintenance = function(id){
	return this({method: 'get', url:`/api/vehicles/${id}/maintenance`})
}

httpClient.addMaintenance = function(id, maintenanceInfo) {
	return this({method: 'post', url:`/api/vehicles/maintenance/${id}`, data: maintenanceInfo})
}

httpClient.editMaintenance = function(id, mntncId, maintenanceInfo){
	return this({method: 'post', url:`/api/vehicles/${id}/maintenance/${mntncId}`, data: maintenanceInfo})
}

httpClient.deleteMaintenance = function(id, mntncId){
	return this({method: 'delete', url:`/api/vehicles/${id}/maintenance/${mntncId}`})
}

httpClient.getLocation = function () {
	return this({method: 'get', url: '/api/users/my-location'})
}


httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient