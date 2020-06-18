import React, { Component } from 'react';
import axios from "axios";

class ApplicationListItem extends Component {
    constructor(props){
        super(props)
        this.state={
            info: this.props.info,
            token: this.props.token
        }
        this.handleAccept=this.handleAccept.bind(this);
        this.handleReject=this.handleReject.bind(this);
    }

    handleAccept(){
        console.log("accepted")
        axios.put('http://localhost:80/api/Application/'+this.state.info.role_id+'/'+this.state.info.user_id+'/'+this.state.info.username)
        .then(res => {this.props.onReject(this.state.info.role_id);
            console.log(res)})
        .catch(err => console.log(err))
    }

    handleReject(){
        axios.delete('http://localhost:80/api/Application/'+this.state.info.role_id+'/'+this.state.info.username+'/'+this.state.token)
        .then(data => {
            this.props.onReject(this.state.info.role_id);
        })
        .catch(err => console.log(err))
    }

    render(){
        console.log("Aplication rendering state:")
        console.log(this.state)
        let resumeBtn = 'Kein Lebenslauf gefunden'
        if (this.state.info.resume_link) resumeBtn = <a target="_blank" href={'http://localhost:80/api/File/'+this.state.info.username}>Lebenslauf</a>
        return <tbody>
            <tr>
                <td>{this.state.info.username}</td>
                <td>{this.state.info.expienece}</td>
                <td>{resumeBtn}</td>
                <td><button onClick={this.handleAccept}>Annehmen</button></td>    
                <td><button onClick={this.handleReject}>Ablehnen</button></td>            
            </tr>
        </tbody>
    }
}
export default ApplicationListItem;