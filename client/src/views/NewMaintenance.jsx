import React from 'react'
import httpClient from '../httpClient'

class NewMaintenance extends React.Component{
    state = {
		fields: { 
                title: '',
                note: '',
                dueDate: '',
                dueAt: ''
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
		httpClient.addMaintenance(this.props.match.params.id, this.state.fields).then((serverResponse) => {
            this.props.history.push('/profile')
        })
	}
    render(){
        const { title, note, dueDate, dueAt} = this.state
        return(
            <form onChange={this.handleFormChange.bind(this)} onSubmit={this.handleFormSubmit.bind(this)}>
                <input type="text" placeholder="Title" name="title" value={title} />
                <input type="text" placeholder="Note" name="note" value={note} />
                <input type="text" placeholder="Due Date" name="dueDate" value={dueDate} />
                <label>Or</label>
                <input type="text" placeholder="Due at" name="dueAt" value={dueAt} />
                <button>Add Maintenance</button>
            </form>
        )
    }
}

export default NewMaintenance