import React, { Component } from 'react';
import axios from "axios";
import { TableRow, TableCell, Button } from '@material-ui/core';

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
        axios.put('http://localhost:80/api/Applications/'+this.state.info.role_id+'/'+this.state.info.user_id+'/'+this.state.info.username)
        .then(res => {this.props.onReject(this.state.info.role_id)})
        .catch(err => console.log(err))
    }

    handleReject(){
        axios.delete('http://localhost:80/api/Applications/'+this.state.info.role_id+'/'+this.state.info.username+'/'+this.state.token)
        .then(data => {
            this.props.onReject(this.state.info.role_id);
        })
        .catch(err => console.log(err))
    }

    render(){
        let resumeBtn = 'Kein Lebenslauf gefunden'
        if (this.state.info.resume_link) resumeBtn = <a target="_blank" href={'http://localhost:80/api/Files/'+this.state.info.username+'/'+this.state.token}>Lebenslauf</a>
        return <TableRow>
                <TableCell>{this.state.info.username}</TableCell>
                <TableCell>{this.state.info.expienece}</TableCell>
                <TableCell>{this.state.info.email}</TableCell>
                <TableCell>{resumeBtn}</TableCell>
                <TableCell><Button variant="contained" color="primary" onClick={this.handleAccept}>Annehmen</Button></TableCell>    
                <TableCell><Button variant="contained" color="error" onClick={this.handleReject}>Ablehnen</Button></TableCell>
        </TableRow>
    }
}
export default ApplicationListItem;