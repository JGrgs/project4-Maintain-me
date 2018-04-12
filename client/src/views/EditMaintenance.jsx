import React from 'react'
import httpClient from '../httpClient'

class EditMaintenance extends React.Component{
    state = {
        maintenance: []
    }
    
    componentDidMount(){
        httpClient.getMaintenance(this.props.routeProps.match.params.id).then((serverResponse) => {
            this.setState({
                vehicle: serverResponse.data,
                maintenance: serverResponse.data.maintenance.find((m) => {
                    return m._id === this.props.routeProps.match.params.mntncId
                })
            })
        })
    }

	handleFormChange(evt) {
		this.setState({
			maintenance: {
				...this.state.maintenance,
				[evt.target.name]: evt.target.value
			}
		})
	}

	handleFormSubmit(evt) {
        evt.preventDefault()
		httpClient.editMaintenance(this.props.routeProps.match.params.id, this.props.routeProps.match.params.mntncId, this.state.maintenance).then((serverResponse) => {
            this.props.routeProps.history.push('/profile')
        })
    }
    
    handleDelete(){
        httpClient.deleteMaintenance(this.props.routeProps.match.params.id, this.props.routeProps.match.params.mntncId).then((serverResponse) => {
            this.props.routeProps.history.push('/profile')
		})
    }


    render(){
        const { maintenance} = this.state

        return(
                        <div>
                            <form onChange={this.handleFormChange.bind(this)} onSubmit={this.handleFormSubmit.bind(this)}>
                                <input type="text" placeholder="Title" name="title" value={maintenance.title} />
                                <input type="text" placeholder="Note" name="note" value={maintenance.note} />
                                <input type="text" placeholder="Due Date" name="dueDate" value={maintenance.dueDate} />
                                <label>Or</label>
                                <input type="text" placeholder="Due at" name="dueAt" value={maintenance.dueAt} />
                                <button>Update Maintenance</button>
                            </form>
                            <button onClick={this.handleDelete.bind(this)}>Delete</button>
                        </div>
                    
               
        )
    }
}

export default EditMaintenance