import * as moment from "moment";
import * as React from "react";
import { IEvent } from "../Event";


interface IProps {
    events: IEvent[];
}

export default class EventsList extends React.Component<IProps> {
    public render() {
        const { events } = this.props;
        
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
                    {events.map(x => {
                        return (
                            <tr key={x.id}>
                                <td>{moment(x.start).format("HH:mm") + " - " + moment(x.end).format("HH:mm")}</td>
                                <td>{x.event}</td>
                                <td>{x.location}</td>               
                                <td className="btn btn-primary btn-action" onClick={this.onOpenModal}>Edit </td>
                                <td className="btn btn-primary btn-action" onClick={this.deleteEvent}>Delete </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }

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
            // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true });
	};
    
    
}