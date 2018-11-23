import * as moment from "moment";
import * as React from "react";
import { IEvent } from "../Event";

interface IProps {
  events: IEvent[];
  selectedDate: Date;
  onEditClicked: (
    event: IEvent
  ) => (event: React.MouseEvent<HTMLElement>) => void;
}

export default class EventsList extends React.Component<IProps> {
  public render() {
    const { events, selectedDate } = this.props;

    return (
      <table className="table table-striped event-list-table">
        <thead>
          <tr>
            <th style={{ width: "18%" }} scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th style={{ width: "21%" }} scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {events
            .filter(
              x =>
                moment(x.start).format("YYYY-MM-DD") ===
                moment(selectedDate).format("YYYY-MM-DD")
            )
            .map(x => {
              return (
                <tr key={x.id}>
                  <td>
                    {moment(x.start).format("HH:mm") +
                      " - " +
                      moment(x.end).format("HH:mm")}
                  </td>
                  <td>{x.event}</td>
                  <td>{x.location}</td>
                  <td>
                    <div
                      className="btn btn-primary btn-action"
                      onClick={this.props.onEditClicked(x)}
                    >
                      <i className="fa fa-pencil" aria-hidden="true" />
                     <span className="button-description"> Edit</span>
                    </div>
                    <div
                      className="btn btn-primary btn-action"
                      onClick={this.deleteEvent(x.id)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true" />
                      <span className="button-description"> Delete</span>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }

  // DELETE event
  private deleteEvent = (id: number) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const url = "https://nucalendarapi.azurewebsites.net/api/Calendar/" + id;

    fetch(url, {
      method: "DELETE"
    }).then((response: any) => {
      if (!response.ok) {
        // Error Response
        alert(response.statusText);
      } else {
        location.reload();
      }
    });
  };
}
