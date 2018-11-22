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
            </table>
        )
    }
}