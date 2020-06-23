import React, { Component } from 'react';
import axios from "axios";


class ProjectRoleDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            info: this.props.info,
            applications: [],
            showApplications: false,
            accepted: [],
            token: this.props.token
        }
        this.fetchApplications=this.fetchApplications.bind(this);
    }

    fetchAccepted(id){
        axios.get('http://localhost:80/api/Role/Accepted/All/'+id+'/'+this.state.token)
        .then(res => {
            this.setState({accepted: res.data.rows})})
        .catch(err => console.log(err))
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
        this.props.handleExpand(this.state.applications, this.state.info.role_id)
    }

    render(){
        return (
            <tbody>
                <tr onClick={this.handleClick}>
                        <td>{this.state.info.title}</td>
                        <td>{this.state.info.number_of_freelancers}</td>
                        <td>{this.state.info.description}</td>
                        <td>{this.state.applications.length}</td>
                        <td>{this.state.accepted.length}</td>
                </tr>
            </tbody>
        )
    }

    componentDidMount(){
        this.fetchApplications();
        this.fetchAccepted(this.state.info.role_id)
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({info: this.props.info})
        this.fetchApplicationsSpecific(nextProps.info.role_id)
        this.fetchAccepted(nextProps.info.role_id)
    }
}

export default ProjectRoleDetail;