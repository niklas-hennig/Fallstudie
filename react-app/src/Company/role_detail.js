import React, { Component } from 'react';
import axios from "axios";

class ProjectRoleDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            info: this.props.info,
            applications: []
        }
        this.fetchApplications=this.fetchApplications.bind(this);
    }

    fetchApplications(){
        console.log("fetching")
        console.log(this.state.info)
        axios.get('http://localhost:80/api/Application/'+this.state.info.project_id)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleClick = (event) =>{
        this.fetchApplications();
    }

    render(){
        return <div onClick={this.handleClick}>
        <p>Role: {this.state.info.title} Anzahl: {this.state.info.number_of_freelancers}</p>
        <p>{this.state.info.description}</p>
        </div>
    }
}

export default ProjectRoleDetail;