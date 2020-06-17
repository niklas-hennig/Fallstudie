import React, { Component } from 'react';
import axios from "axios";


class ProjectRoleDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            info: this.props.info,
            applications: [],
            showApplications: false
        }
        this.fetchApplications=this.fetchApplications.bind(this);
    }

    fetchApplications(){
        axios.get('http://localhost:80/api/Application/'+this.state.info.role_id)
        .then(res => {
            this.setState({applications: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    fetchApplicationsSpecific(id){
        axios.get('http://localhost:80/api/Application/'+id)
        .then(res => {
            this.setState({applications: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleClick = (event) =>{
        this.props.handleExpand(this.state.applications)
    }

    render(){
        return (
            <tbody>
                <tr onClick={this.handleClick}>
                        <td>{this.state.info.title}</td>
                        <td>{this.state.info.number_of_freelancers}</td>
                        <td>{this.state.info.description}</td>
                        <td>{this.state.applications.length}</td>
                </tr>
            </tbody>
        )
    }

    componentDidMount(){
        this.fetchApplications();
    }

    componentWillReceiveProps(nextProps){
        this.setState({info: this.props.info})
        this.fetchApplicationsSpecific(nextProps.info.role_id)
    }
}

export default ProjectRoleDetail;