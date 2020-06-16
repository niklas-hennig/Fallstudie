import React, { Component } from 'react';
import axios from "axios";

class RoleDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            role_id: this.props.role_id
        }
        this.style ={
            position: 'absolute',
            left: '15%',
            width: '70%',
            height: '100%'
        }
        this.handleBack=this.handleBack.bind(this);
        console.log("creating new role detail")
    }

    handleBack = (event) =>{
        this.props.onBack()
    }

    render(){
        console.log("rendering detail: ")
        console.log(this.state)
        return <div style={this.style}>
            <button onClick={this.handleBack}>Zurück</button>
            <p>Ich informiere über Rolle: {this.props.role_id}</p>
        </div>
    }

    componentWillReceiveProps(){
        if(this.state.role_id!=this.props.role_id)
            this.setState({role_id: this.props.role_id})
    }
}

export default RoleDetail;