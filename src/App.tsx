import * as moment from 'moment';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import Modal from 'react-responsive-modal';
import './App.css';
import CalendarView from './components/CalendarView';
import EventList from './components/EventsList';
import { IEvent } from './Event';




interface IState {
	currentEvent: IEvent,
	events: IEvent[],
	open: boolean,
	selectedDate: Date
}

class App extends React.Component<{}, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			currentEvent: { id: 0, event: "", location: "", start: "", end: "" },
			events: [],
			open: false,
			selectedDate: new Date(new Date().setHours(0, 0, 0, 0))
		}

		this.fetchMemes()
		this.fetchMemes = this.fetchMemes.bind(this)
		this.uploadEvent = this.uploadEvent.bind(this)

	}

	public render() {
		const { open, selectedDate } = this.state;
		const title = moment(selectedDate).format("MMMM ") + moment(selectedDate).format("YYYY") + " Events"
		return (
			<div>
				<div className="header-wrapper">
					<div className="container header">
						<img height='40' />&nbsp; {title} &nbsp;
				</div>
				</div>
				<div className="container">
					<CalendarView selectedDate={this.state.selectedDate} updateSelectedDate={this.updateSelectedDate} />
					<EventList events={this.state.events} selectedDate={this.state.selectedDate} />
					<DatePicker showTimeSelect={true} showTimeSelectOnly={true} dateFormat="h:mm" timeCaption="Time" selected={moment(this.state.currentEvent.start)} onChange={this.onChangeDate}>Add Event</DatePicker>
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

	private updateSelectedDate = (selectedDate: Date): void => {
		this.setState({ selectedDate })
	}

	private onChangeDate = (date: moment.Moment, event: React.SyntheticEvent<any>): void => {
		this.setState({ selectedDate: date.toDate() })
	};

	// Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
	};

	// GET memes
	private fetchMemes() {
		const url = "https://nucalendarapi.azurewebsites.net/api/Calendar";
		fetch(url, {
			method: "GET"
		})
			.then(res => res.json())
			.then(data => {
				const events: IEvent[] = data;
				this.setState({
					events
				});
			});
	}

	// POST meme
	private uploadEvent() {
		const eventInput = document.getElementById("november-event-input") as HTMLInputElement
		const locationInput = document.getElementById("november-location-input") as HTMLInputElement
		const startInput = document.getElementById("november-event-start-input") as HTMLInputElement
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
			headers: { 'cache-control': 'no-cache' },
			method: 'POST'
		})
			.then((response: any) => {
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
