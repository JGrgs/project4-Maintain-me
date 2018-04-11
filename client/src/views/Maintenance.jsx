import React from 'react'
import { Link } from 'react-router-dom'
import httpClient from '../httpClient.js'

class MaintenanceList extends React.Component{

	state = {
		vehicles: []
	}

	componentDidMount(){
		httpClient.getVehicle().then((serverResponse) => {
			this.setState({
				vehicles: serverResponse.data.filter((v) => {
					return this.props.currentUser._id === v.user && v._id === this.props.routeProps.match.params.id
				  })
			})
		})
	}


	render() {
	const { vehicles } = this.state
	return (
		<div className='Maintenance'>
			{vehicles.map((v) => {
				return (
					<div className="MaintenanceList" key={v._id}>
					<h2>Maintenance for {v.model}: </h2>
					
						{v.maintenance.map((m) => {
							return (
								<ul key={m._id}>
								<li><Link to={`/vehicles/${v._id}/maintenance/${m._id}`}>{m.title}</Link> - Due: {m.dueAt} - Note: {m.note}</li>
								</ul>
							)
                        })}
                        
						<Link to={`/vehicles/maintenance/${v._id}/new`}>Add Maintenance</Link>
					</div>
				)
			})}
			
		</div>
	)
}
}

export default MaintenanceList