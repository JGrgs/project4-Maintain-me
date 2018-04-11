import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import httpClient from './httpClient'

import NavBar from './NavBar'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import Profile from './views/Profile'
import Home from './views/Home'
import NewVehicle from './views/NewVehicle'
import NewMaintenance from './views/NewMaintenance'
import MaintenanceList from './views/Maintenance'
import EditMaintenance from './views/EditMaintenance'
import GoogleApiWrapper from './views/Map'

class App extends React.Component {
	state = { currentUser: httpClient.getCurrentUser() }

	onLoginSuccess(user) {
		this.setState({ currentUser: httpClient.getCurrentUser() })
	}

	logOut() {
		httpClient.logOut()
		this.setState({ currentUser: null })
	}
	
	render() {
		const { currentUser } = this.state
		return (
			<div className='App container'>

				<NavBar currentUser={currentUser} />

				<Switch>

					<Route path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/logout" render={(props) => {
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />

					<Route path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />


					<Route path='/vehicles/maintenance/:id/new' component={NewMaintenance} />

					<Route path='/vehicles/:id/maintenance/:mntncId' render={(routeProps) => {
						return currentUser
						? <EditMaintenance currentUser={currentUser} routeProps={routeProps}/>
						: <Redirect to="/login" />
					}} />

					<Route path='/vehicles/:id/maintenance' render={(routeProps) => {
						return currentUser
						? <MaintenanceList currentUser={currentUser} routeProps={routeProps}/>
						: <Redirect to="/login" />
					}}/>

					<Route path='/vehicles/new' component={NewVehicle} />


					<Route path="/profile" render={(routeProps) => {
						return currentUser
							? <Profile {...routeProps} currentUser={currentUser} onDeleteAccount={this.logOut.bind(this)}/>
							: <Redirect to="/login" />
					}} />

					<Route path='/map' render={(routeProps) => {
						return currentUser
						? <GoogleApiWrapper currentUser={currentUser} routeProps={routeProps}/>
						: <Redirect to="/" />
					}}/>

					<Route path="/" component={Home} />

				</Switch>
			</div>
		)
	}
}

export default App