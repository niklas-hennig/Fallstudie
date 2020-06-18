import React, { Component } from 'react';
import axios from "axios";

class ApplicationListItem extends Component {
    constructor(props){
        super(props)
        this.state={
            info: this.props.info,
            token: this.props.token
        }
    }
    render(){
        console.log("Accepted rendering state:")
        console.log(this.state)
        let resumeBtn = 'Kein Lebenslauf gefunden'
        if (this.state.info.resume_link) resumeBtn = <a target="_blank" href={'http://localhost:80/api/File/'+this.state.info.username}>Lebenslauf</a>
        return <tbody>
            <tr>
                <td>{this.state.info.username}</td>
                <td>Ich bin eintest</td>
                <td>{this.state.info.expienece}</td>
                <td>{resumeBtn}</td>
                <td>{this.state.info.email}</td>           
            </tr>
        </tbody>
    }
}
export default ApplicationListItem;