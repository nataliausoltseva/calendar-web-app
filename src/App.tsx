import * as React from 'react';
import Modal from 'react-responsive-modal';
import './App.css';
import EventList from './components/EventsList';
import NovemberCalendar from './components/NovemberCalendar';



interface IState {
	events:any[]
	currentEvent: any,
	open: boolean
}

class App extends React.Component<{}, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			currentEvent: {"id":0, "event":"Loading ", "location":"not found", "start":"2018-11-22T14:43:00", "end":"2018-11-22T22:50:00"},
			events: [],
			open: false
		}     
		
		this.fetchMemes("")
		this.selectNewEvent = this.selectNewEvent.bind(this)
		this.fetchMemes = this.fetchMemes.bind(this)
		this.uploadEvent 	= this.uploadEvent.bind(this)
		
	}

	public render() {
		const { open } = this.state;
		return (
		<div>
			<div className="header-wrapper">
				<div className="container header">
					<img height='40'/>&nbsp; November Events &nbsp;
					<div className="btn btn-primary btn-action btn-add" onClick={this.onOpenModal}>Add Event</div>
				</div>
			</div>
			<div className="container">
				<NovemberCalendar/>
				<EventList/>
			</div>
			
			<Modal open={open} onClose={this.onCloseModal}>
				<form>
					<div className="form-group">
						<label>Event Name</label>
						<input type="text" className="form-control" id="november-event-input" placeholder="Enter Event" />
						<small className="form-text text-muted">You can edit any event later</small>
					</div>
					<div className="form-group">
						<label>Event Location</label>
						<input type="text" className="form-control" id="november-location-input" placeholder="Enter Event Location" />
						<small className="form-text text-muted">You can edit any event location later</small>
					</div>
					<div className="form-group">
						<label>Event Start Time</label>
						<input type="text" className="form-control" id="november-event-start-input" placeholder="Enter Event Start Time" />
						<small className="form-text text-muted">You can edit any event start time later</small>
					</div>
					<div className="form-group">
						<label>Event End Time</label>
						<input type="text" className="form-control" id="meme-tag-input" placeholder="Enter Event End Time" />
						<small className="form-text text-muted">You can edit any event end time later</small>
					</div>
					<div className="form-group">
						<label>Event Tag</label>
						<input type="text" className="form-control" id="meme-tag-input" placeholder="Enter Tag" />
						<small className="form-text text-muted">Event Tag is used for search</small>
					</div>
					<button type="button" className="btn" onClick={this.uploadEvent}>Upload</button>
				</form>
			</Modal>
		</div>
		);
	}

	// Modal open
	private onOpenModal = () => {
		this.setState({ open: true });
	  };
	
	// Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
	};
	
	// Change selected meme
	private selectNewEvent(newMeme: any) {
		this.setState({
			currentEvent: newMeme
		})
	}

	// GET memes
	private fetchMemes(event: any) {
		let url = "https://nucalendarapi.azurewebsites.net/api/Calendar"
		if (event !== "") {	
			url += "/event?=" + event
		}
        fetch(url, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
			let currentEvent = json[0]
			if (currentEvent === undefined) {
				currentEvent = {"id":0, "event":"No events","location":"No Location","start":"", "end":""}
			}
			this.setState({
				currentEvent,
				events: json
			})
        });
	}

	// POST meme
	private uploadEvent() {
		const eventInput = document.getElementById("november-event-input") as HTMLInputElement
		const locationInput = document.getElementById("november-location-input") as HTMLInputElement
		const startInput = document.getElementById("november-event-start-input")as HTMLInputElement
		const endInput = document.getElementById("november-event-end-input") as HTMLInputElement


		if (eventInput === null || locationInput === null || startInput === null || endInput === null) {
			return;
		}

		const event = eventInput.value
		const locationEvent = locationInput.value
		const start = startInput.value
		const end = endInput.value
		const url = "https://nucalendarapi.azurewebsites.net/api/Calendar"

		const formData = new FormData()
		formData.append("Event", event)
		formData.append("Location", locationEvent)
		formData.append("Start", start)
		formData.append("End", end)

		fetch(url, {
			body: formData,
			headers: {'cache-control': 'no-cache'},
			method: 'POST'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				location.reload()
			}
		  })
	}
}

export default App;
