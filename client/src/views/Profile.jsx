import React from 'react';
import { Link } from 'react-router-dom'
import httpClient from '../httpClient.js'

class Profile extends React.Component{

	state = {
		vehicles: []
	}

	componentDidMount(){
		httpClient.getVehicle().then((serverResponse) => {
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

	render() {
	const { vehicles } = this.state
	return (
		<div className='Profile'>
			<h1>{this.props.currentUser.name}'s Profile!</h1>
			<button onClick={this.handleDeleteUser.bind(this)}>Delete Profile</button>
			<Link to="/vehicles/new">Add Car</Link>
			{vehicles.map((v) => {
				return (
					<div className="Car" key={v._id}>
						<div className="CarInfo">
							<h3>{v.year} - {v.make} {v.model}</h3>
							<img src={`${v.image}`} alt={`${v.model}`} />
						{/* <h3>Mileage: {v.mileage}</h3> */}
						</div>
						<div className="MaintenanceDue">
							<Link to={`/vehicles/${v._id}/maintenance`}>Maintenance Info</Link>
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
