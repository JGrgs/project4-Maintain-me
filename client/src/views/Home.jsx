import React from 'react'
import carImg from '../images/car.jpg'
import oilChangeImg from '../images/OilChangeDue.jpg'
import mapImg from '../images/sampleMap.jpg'
import mechanicImg from '../images/mechanic.jpg'

const Home = (props) => {
	return (
		<div className='Home'>
			<h1 className="homeh1">Maintain Me</h1>
			<h2 className="homeh2">Track your maintenance schedules.</h2>
			<div className="row">
				<div className="column-25">
					<img className="image-circle" src={oilChangeImg} alt="oil change"/>
				</div>
				<div className="column-75">
					<p>Maintain me is an app created to help you track you vehicle's maintenance schedules. Every user gets to add their vehicle/vehicles into their profile and add their maintenance schedules into a table providing the maintenance type, due date/due at (miles).</p>
				</div>
			</div>
			<div className="row">
				<div className="column-25">
					<p>With the help of the google maps and yelp APIs, maintain me renders a map pinpointing all the mechanics around the user based on the user's location which is provided to us when a user signs up.</p>
				</div>
				<div className="column-75">
					<img className="image-circle" src={mapImg} alt="map"/>
				</div>
			</div>
			<div className="row">
				<div className="column-25">
					<img className="image-circle" src={carImg} alt="car"/>
				</div>
				<div className="column-75">
					<p>Keep your vehicle in an excellent condition by always staying on top of the maintenance it needs.</p>
				</div>
			</div>
		</div>
	)
}

export default Home