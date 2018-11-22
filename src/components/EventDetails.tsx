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
                
                <Modal open={open} onClose={this.onCloseModal}>
                    <form>
                        <div className="form-group">
                            <label>Event Name</label>
                            <input type="text" className="form-control" id="november-event-edit-input" placeholder="Enter Event" />
                            <small className="form-text text-muted">You can edit any event later</small>
                        </div>
                        <div className="form-group">
                            <label>Event Location</label>
                            <input type="text" className="form-control" id="november-location-edit-input" placeholder="Enter Event Location" />
                            <small className="form-text text-muted">You can edit any event location later</small>
                        </div>
                        <div className="form-group">
                            <label>Event Start Time</label>
                            <input type="text" className="form-control" id="november-event-start-edit-input" placeholder="Enter Event Start Time" />
                            <small className="form-text text-muted">You can edit any event start time later</small>
                        </div>
                        <div className="form-group">
                            <label>Event End Time</label>
                            <input type="text" className="form-control" id="november-event-end-edit-input" placeholder="Enter Event End Time" />
                            <small className="form-text text-muted">You can edit any event end time later</small>
                        </div>
                        <div className="form-group">
                            <label>Event Tag</label>
                            <input type="text" className="form-control" id="event-tag-edit-input" placeholder="Enter Tag" />
                            <small className="form-text text-muted">Event Tag is used for search</small>
                        </div>

                        <button type="button" className="btn" onClick={this.updateEvent}>Save</button>
                    </form>
                </Modal>
            </div>
		);
    }


    // Modal Close
    private onCloseModal = () => {
		this.setState({ open: false });
	};


    // PUT event
    private updateEvent(){
        const eventInput = document.getElementById("event-edit-title-input") as HTMLInputElement
        const locationInput = document.getElementById("event-edit-tag-input") as HTMLInputElement
        const startInput = document.getElementById("event-edit-tag-input") as HTMLInputElement
        const endInput = document.getElementById("event-edit-tag-input") as HTMLInputElement

        if (eventInput === null || locationInput === null || startInput === null || endInput === null) {
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
                "end": updatedEnd,
                "event": updatedEvent,
                "id": currentEvent.id,
                "location": updatedLocation,
                "start": updatedStart,
                "uploaded": currentEvent.uploaded,
                "url": currentEvent.url
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