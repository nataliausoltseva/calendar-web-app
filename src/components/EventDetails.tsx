import * as React from "react";
import Modal from 'react-responsive-modal';

interface IProps {
    currentEvent: any
}

interface IState {
    open: boolean
}

export default class eventDetail extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)   
        this.state = {
            open: false
        }

        this.updateEvent = this.updateEvent.bind(this)
    }

	public render() {
        const currentEvent = this.props.currentEvent
        const { open } = this.state;
		return (
			<div className="container event-wrapper">
                <div className="row event-heading">
                    <b>{currentEvent.title}</b>&nbsp; ({currentEvent.tags})
                </div>
                <div className="row event-date">
                    {currentEvent.uploaded}
                </div>                
                <div className="row event-done-button">
                    <div className="btn btn-primary btn-action" onClick={this.onOpenModal}>Edit </div>
                    <div className="btn btn-primary btn-action" onClick={this.deleteEvent.bind(this, currentEvent.id)}>Delete </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal}>
                    <form>
                        <div className="form-group">
                            <label>Event</label>
                            <input type="text" className="form-control" id="event-edit-title-input" placeholder="Enter Title"/>
                            <small className="form-text text-muted">You can edit any event later</small>
                        </div>
                        <div className="form-group">
                            <label>Event</label>
                            <input type="text" className="form-control" id="event-edit-tag-input" placeholder="Enter Tag"/>
                            <small className="form-text text-muted">Event is used for search</small>
                        </div>
                        <button type="button" className="btn" onClick={this.updateEvent}>Save</button>
                    </form>
                </Modal>
            </div>
		);
    }

    // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true });
	};
    
    // Modal Close
    private onCloseModal = () => {
		this.setState({ open: false });
	};

    // DELETE event
    private deleteEvent(id: any) {
        const url = "https://nucalendarapi.azurewebsites.net/api/Calendar/" + id

		fetch(url, {
			method: 'DELETE'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error Response
				alert(response.statusText)
			}
			else {
              location.reload()
			}
		  })
    }

    // PUT event
    private updateEvent(){
        const eventInput = document.getElementById("event-edit-title-input") as HTMLInputElement
        const locationInput = document.getElementById("event-edit-tag-input") as HTMLInputElement
        const startInput = document.getElementById("event-edit-tag-input") as HTMLInputElement
        const endInput = document.getElementById("event-edit-tag-input") as HTMLInputElement

        if (eventInput === null || locationInput === null) {
			return;
		}

        const currentEvent = this.props.currentEvent
        const url = "https://nucalendarapi.azurewebsites.net/api/Calendar/" + currentEvent.id
        const updatedEvent = eventInput.value
        const updatedLocation = locationInput.value
        const updatedStart = startInput.value
        const updatedEnd = endInput.value

		fetch(url, {
			body: JSON.stringify({
                "id": currentEvent.id,
                "event": updatedEvent,
                "location": updatedLocation,
                "uploaded": currentEvent.uploaded,
                "url": currentEvent.url,
                "start": updatedStart,
                "end": updatedEnd
            }),
			headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
			method: 'PUT'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText + " " + url)
			} else {
				location.reload()
			}
		  })
    }
}