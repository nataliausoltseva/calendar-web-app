import * as React from "react";

export default class EventsList extends React.Component {
    public render() {
        return(
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">2018-11-22T08:58:48.42 - 2018-11-22T09:58:48.42</th>  
                        <td>Birthday Party</td>
                        <td>Auckland CBD</td>                      
                    </tr>
                    <tr>
                        <th scope="row">2018-11-23T08:58:48.42 - 2018-11-23T10:58:48.42</th>
                        <td>Job Interview</td>
                        <td>OGGB Lab 5</td>
                    </tr>

                </tbody>
            </table>
        )
    }
}