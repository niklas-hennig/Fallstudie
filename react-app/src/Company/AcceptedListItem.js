import React, { Component } from 'react';
import { TableRow, TableCell } from '@material-ui/core';

class ApplicationListItem extends Component {
    constructor(props){
        super(props)
        this.state={
            info: this.props.info,
            token: this.props.token
        }
    }
    render(){
        let resumeBtn = 'Kein Lebenslauf gefunden'
        if (this.state.info.resume_link) resumeBtn = <a target="_blank" href={'http://localhost:80/api/File/'+this.state.info.username}>Lebenslauf</a>
        return <TableRow>
                <TableCell>{this.state.info.username}</TableCell>
                <TableCell>{this.state.info.expienece}</TableCell>
                <TableCell>{this.state.info.email}</TableCell>
                <TableCell>{resumeBtn}</TableCell>        
        </TableRow>
    }
}
export default ApplicationListItem;