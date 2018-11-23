import * as moment from "moment";
import * as React from "react";
import Modal from "react-responsive-modal";
import "./App.css";
import CalendarView from "./components/CalendarView";
import EventList from "./components/EventsList";
import { IEvent } from "./Event";

interface IState {
  currentEvent: IEvent;
  events: IEvent[];
  open: boolean;
  selectedDate: Date;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentEvent: { id: 0, event: "", location: "", start: "", end: "" },
      events: [],
      open: false,
      selectedDate: new Date(new Date().setHours(0, 0, 0, 0))
    };

    this.fetchMemes();
    this.fetchMemes = this.fetchMemes.bind(this);
    this.uploadEvent = this.uploadEvent.bind(this);
  }

  public render() {
    const { open, selectedDate } = this.state;
    const title =
      moment(selectedDate).format("MMMM ") +
      moment(selectedDate).format("YYYY") +
      " Events";
    return (
      <div>
        <div className="header-wrapper">
          <div className="container header">
            <img height="40" />
            &nbsp; {title} &nbsp;
          </div>
        </div>
        <div className="container">
          <CalendarView
            selectedDate={this.state.selectedDate}
            updateSelectedDate={this.updateSelectedDate}
          />
          <EventList
            events={this.state.events}
            selectedDate={this.state.selectedDate}
            onEditClicked={this.onEditClicked}
          />
          <div className="add-event-button-container">
            <div
              className="btn btn-primary btn-action btn-add"
              onClick={this.onOpenModal}
            >
              <i className="fa fa-plus" aria-hidden="true" />
              <span className="button-description"> Add Event</span>
            </div>
          </div>
        </div>

        <Modal open={open} onClose={this.onCloseModal}>
          <form>
            <div className="form-group">
              <label>Event Name</label>
              <input
                defaultValue={this.state.currentEvent.event}
                type="text"
                className="form-control"
                id="november-event-input"
                placeholder="Enter Event"
              />
              <small className="form-text text-muted">
                You can edit any event later
              </small>
            </div>
            <div className="form-group">
              <label>Event Location</label>
              <input
                defaultValue={this.state.currentEvent.location}
                type="text"
                className="form-control"
                id="november-location-input"
                placeholder="Enter Event Location"
              />
              <small className="form-text text-muted">
                You can edit any event location later
              </small>
            </div>
            <div className="form-group">
              <label>Event Start Time</label>
              <input
                defaultValue={
                  this.state.currentEvent.start
                    ? moment(this.state.currentEvent.start).format("HH:mm")
                    : undefined
                }
                type="text"
                className="form-control"
                id="november-event-start-input"
                placeholder="Enter Event Start Time"
              />
              <small className="form-text text-muted">Format HH:MM</small>
            </div>
            <div className="form-group">
              <label>Event End Time</label>
              <input
                defaultValue={
                  this.state.currentEvent.end
                    ? moment(this.state.currentEvent.end).format("HH:mm")
                    : undefined
                }
                type="text"
                className="form-control"
                id="november-event-end-input"
                placeholder="Enter Event End Time"
              />
              <small className="form-text text-muted">Format HH:MM</small>
            </div>
            <button type="button" className="btn" onClick={this.uploadEvent}>
              Save
            </button>
          </form>
        </Modal>
      </div>
    );
  }

  private updateSelectedDate = (selectedDate: Date): void => {
    this.setState({ selectedDate });
  };

  // Modal open
  private onOpenModal = () => {
    this.setState({ open: true });
  };

  // Modal close
  private onCloseModal = () => {
    this.setState({
      currentEvent: { id: 0, event: "", location: "", start: "", end: "" },
      open: false
    });
  };

  private onEditClicked = (event: IEvent) => (
    mouseEvent: React.MouseEvent<HTMLElement>
  ) => {
    this.setState({ currentEvent: event });
    this.onOpenModal();
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
    const eventInput = document.getElementById(
      "november-event-input"
    ) as HTMLInputElement;
    const locationInput = document.getElementById(
      "november-location-input"
    ) as HTMLInputElement;
    const startInput = document.getElementById(
      "november-event-start-input"
    ) as HTMLInputElement;
    const endInput = document.getElementById(
      "november-event-end-input"
    ) as HTMLInputElement;
    if (
      eventInput === null ||
      locationInput === null ||
      startInput === null ||
      endInput === null
    ) {
      return;
    }

    // Validate time
    const startTimeParts = startInput.value.split(":");
    if (startTimeParts.length !== 2) {
      alert("Please specify start time in correct format.");
      return;
    }

    const startHours = Number(startTimeParts[0]);
    const startMinutes = Number(startTimeParts[1]);
    if (
      isNaN(startHours) ||
      isNaN(startMinutes) ||
      startHours < 0 ||
      startHours > 23 ||
      startMinutes < 0 ||
      startMinutes > 59
    ) {
      alert("Please specify start time in correct format.");
      return;
    }

    const endTimeParts = endInput.value.split(":");
    if (endTimeParts.length !== 2) {
      alert("Please specify end time in correct format.");
      return;
    }

    const endHours = Number(endTimeParts[0]);
    const endMinutes = Number(endTimeParts[1]);
    if (
      isNaN(endHours) ||
      isNaN(endMinutes) ||
      endHours < 0 ||
      endHours > 23 ||
      endMinutes < 0 ||
      endMinutes > 59
    ) {
      alert("Please specify end time in correct format.");
      return;
    }

    const event = eventInput.value;
    const locationEvent = locationInput.value;
    const start = moment(this.state.selectedDate).toDate();
    start.setHours(startHours);
    start.setMinutes(startMinutes);
    const end = moment(this.state.selectedDate).toDate();
    end.setHours(endHours);
    end.setMinutes(endMinutes);

    if (start.getTime() > end.getTime()) {
      alert("End date cannot be before start date.");
      return;
    }

    const eventJson: string = JSON.stringify({
      end: end.toISOString(),
      event,
      id: this.state.currentEvent.id,
      location: locationEvent,
      start: start.toISOString()
    });

    if (this.state.currentEvent.id === 0) {
      // Create
      const url = "https://nucalendarapi.azurewebsites.net/api/Calendar";

      fetch(url, {
        body: eventJson,
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        method: "POST"
      }).then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText);
        } else {
          location.reload();
        }
      });
    } else {
      // Update
      const url =
        "https://nucalendarapi.azurewebsites.net/api/Calendar/" +
        this.state.currentEvent.id;

      fetch(url, {
        body: eventJson,
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        method: "PUT"
      }).then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText);
        } else {
          location.reload();
        }
      });
    }
  }
}

export default App;
