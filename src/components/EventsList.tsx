import * as React from "react";
import { IEvent } from "../Event";

interface IProps {
  events?: IEvent[];
}

export default class EventsList extends React.Component<IProps> {
  public render() {
    let { events } = this.props;
    events = [];
    events.push({
      end: "2018-11-22T08:58:48.42",
      event: "string",
      id: 1,
      location: "string",
      start: "2018-11-22T08:58:48.42"
    });

    events.push({
      end: "2018-11-22T10:51:13.687",
      event: "string",
      id: 6,
      location: "string",
      start: "2018-11-22T09:51:13.687"
    });
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
            {events.map(x=>{
                return (
                    <tr key = {x.id}>
                    <td>{x.start + " - " + x.end}}</td>
                    <td>{x.event}</td>
                    <td>{x.location}</td>
                    </tr>
                    )})}
        </tbody>
      </table>
    );
  }
}