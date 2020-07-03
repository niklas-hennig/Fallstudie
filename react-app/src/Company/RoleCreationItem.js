import React, { Component } from 'react';
import { TableRow, TableCell } from '@material-ui/core';

class RoleCreationItem extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.info.id,
            title: this.props.info.title,
            description:  this.props.info.description,
            requirements:  this.props.info.requirements,
            payment:  this.props.info.payment,
            area: this.props.info.area,
            numberOfFreeancers:  this.props.info.numberOfFreeancers
        }
    }

    onDelete = (event) =>{
        this.props.onDelete(this.state.id)
    }

    render(){
        return <TableRow>
                <TableCell>{this.state.title}</TableCell>
                <TableCell>{this.state.description}</TableCell>
                <TableCell>{this.state.requirements}</TableCell>
                <TableCell>{this.state.payment}</TableCell>
                <TableCell>{this.state.area}</TableCell>
                <TableCell>{this.state.numberOfFreeancers}</TableCell>
                <TableCell><button onClick={this.onDelete}>Löschen</button></TableCell>
        </TableRow>
    }

}

export default RoleCreationItem;