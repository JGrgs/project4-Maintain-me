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
					<table>
						<thead>
							<tr>
								<th>Maintenance</th>
								<th>Due Date</th>
								<th>Due At (Miles)</th>
							</tr>
						</thead>
					{v.maintenance.map((m) => {
						return (
						<tbody>
							<tr>
								<td>{m.title}</td>
								<td>{m.dueDate}</td>
								<td>{m.dueAt}</td>
							</tr>
						</tbody>
						)
					})}
					
					<Link to={`/vehicles/maintenance/${v._id}/new`}>Add Maintenance</Link>
				  </table>
				)
			})}
		</div>
		
	)
}
}

export default MaintenanceList