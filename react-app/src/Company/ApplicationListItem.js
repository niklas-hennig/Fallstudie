import React, { Component } from 'react';

class ApplicationListItem extends Component {
    constructor(props){
        super(props)
        this.state={
            info: this.props.info
        }
        this.handleOpenResume=this.handleOpenResume.bind(this);
        this.handleAccept=this.handleAccept.bind(this);
        this.handleReject=this.handleReject.bind(this);
    }

    handleOpenResume(){
        console.log("opening resume")
    }

    handleAccept(){
        console.log("accepted")
    }

    handleReject(){
        console.log("rejected")
    }

    render(){
        console.log("Aplication rendering state:")
        console.log(this.state.info)
        return <tbody>
            <tr>
                <td>{this.state.info.username}</td>
                <td>{this.state.info.expienece}</td>
                <td><button onClick={this.handleOpenResume}>Öffnen</button></td>
                <td><button onClick={this.handleAccept}>Annehmen</button></td>    
                <td><button onClick={this.handleReject}>Ablehnen</button></td>            
            </tr>
        </tbody>
    }
}
export default ApplicationListItem;