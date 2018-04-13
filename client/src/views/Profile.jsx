import React from 'react';
import { Link } from 'react-router-dom'
import httpClient from '../httpClient.js'

class Profile extends React.Component{

	state = {
		vehicles: []
	}

	componentDidMount(){
		httpClient.getVehicle().then((serverResponse) => {
			console.log(this.props)
			this.setState({
				vehicles: serverResponse.data.filter((v) => {
					return this.props.currentUser._id === v.user
				  })
			})
		})
	}

	handleDelete(id){
		httpClient.deleteVehicle(id).then((serverResponse) => {
			this.setState({
				vehicles: this.state.vehicles.filter((v) => {
					return v._id !== id
				})
			})
		})
	}


	handleDeleteUser() {
		httpClient.deleteUser(this.props.currentUser._id).then((serverResponse) => {
			this.props.onDeleteAccount()
			this.props.history.push('/signup')
		})
	}

	handleAddVehicle(){
		this.props.history.push('/vehicles/new')
	}

	render() {
	const { vehicles } = this.state
	return (
		<div className='Profile'>
			<h1>{this.props.currentUser.name}'s Vehicle(s)</h1>
			<button onClick={this.handleAddVehicle.bind(this)}>Add Vehicle</button>
			<button className="delete-profile" onClick={this.handleDeleteUser.bind(this)}>Delete Profile</button>
			{vehicles.map((v) => {
				return (
					<div className="row profile" key={v._id}>
						<div className="column-25 profile">
							<h3 className="h3-vehicle-name">{v.year} - {v.make} {v.model}</h3>
							<img src={`${v.image}`} alt={`${v.model}`} />
						{/* <h3>Mileage: {v.mileage}</h3> */}
						</div>
						<div className="column-75 vehicle-text-column">
							<Link className="maintenanceLink" to={`/vehicles/${v._id}/maintenance`}>Maintenance Info</Link>
							<br/>
							<button onClick={this.handleDelete.bind(this, v._id)}>Delete Vehicle</button>
						</div>
					</div>
				)
			})}
		</div>
	)
}
}

export default Profile
