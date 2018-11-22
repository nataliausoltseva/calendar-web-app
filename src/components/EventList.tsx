import * as React from "react";

interface IProps {
    memes: any[],
    selectNewEvent: any,
    searchByEvent: any
}

export default class eventList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)   
        this.searchByEvent = this.searchByEvent.bind(this)
    }

	public render() {
		return (
			<div className="container meme-list-wrapper">
                <div className="row meme-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Tags" />
                        <div className="input-group-append">
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByEvent}>Search</div>
                        </div>
                    </div>  
                </div>
                <div className="row meme-list-table">
                    <table className="table table-striped">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
		);
    }

    // Construct table using meme list
	private createTable() {
        const table:any[] = []
        const eventList = this.props.memes
        if (eventList == null) {
            return table
        }

        for (let i = 0; i < eventList.length; i++) {
            const children = []
            const meme = eventList[i]
            children.push(<td key={"id" + i}>{meme.id}</td>)
            children.push(<td key={"name" + i}>{meme.title}</td>)
            children.push(<td key={"tags" + i}>{meme.tags}</td>)
            table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
        }
        return table
    }
    
    // Meme selection handler to display selected meme in details component
    private selectRow(index: any) {
        const selectedMeme = this.props.memes[index]
        if (selectedMeme != null) {
            this.props.selectNewEvent(selectedMeme)
        }
    }

    // Search meme by tag
    private searchByEvent() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const tag = textBox.value 
        this.props.searchByEvent(tag)  
    }

}