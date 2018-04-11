import React from 'react'
import httpClient from '../httpClient'

class NewVehicle extends React.Component{
    state = {
		fields: { 
            make: '', 
            model: '',
            year: '',
            image: ''
        }
	}

	handleFormChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	handleFormSubmit(evt) {
		evt.preventDefault()
		httpClient.addVehicle(this.state.fields).then((serverResponse) => {
            this.props.history.push('/profile')
        })
	}
    render(){
        const { make, model, year, image } = this.state
        return(
            <form onChange={this.handleFormChange.bind(this)} onSubmit={this.handleFormSubmit.bind(this)}>
                <input type="text" placeholder="Make" name="make" value={make} />
                <input type="text" placeholder="Model" name="model" value={model} />
                <input type="text" placeholder="Year" name="year" value={year} />
                <input type="text" placeholder="Image" name="image" value={image} />
                
                <button>Add Car</button>
            </form>
        )
    }
}

export default NewVehicle