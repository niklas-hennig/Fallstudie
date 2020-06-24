import React, { Component } from 'react';
import axios from 'axios';

import RoleListItem from './listRoleItem';
import FreelancerListItem from './freelancerListItem';

class RightBar extends Component {
    constructor(props){
        super(props);
        this.state={
            username: this.props.username,
            type: this.props.type,
            token: this.props.token,
            comp_id: this.props.comp_id,
            applications: [],
            update: null
        }
        this.style = {
            marginBottom: "70px"
        }
        this.setProjects=this.setProjects.bind(this);
    }

    setProjects(){
        this.props.onChange();
        if (this.state.type==="f")
            axios.get('http://localhost:80/api/Application/Freelancer/'+this.state.username+'/'+this.state.token)
            .then(res => {
                this.setState({applications: res.data})
            })
            .catch(err => {
                console.log(err)
            })
        else 
            axios.get('http://localhost:80/api/Application/Company/'+this.state.comp_id)
            .then(res => {
                this.setState({applications: res.data})
            })
            .catch(err => console.log(err))
    }

    render(){
        let applications = ''
        if (this.state.applications.length>0 && this.state.type==="f"){
            applications = this.state.applications.map((appInfo, index) => <RoleListItem type={this.state.type} key={appInfo.role_id} role_id={appInfo.role_id} title={appInfo.title} mode="right" token={this.state.token} username={this.state.username} onChange={this.setProjects}> </RoleListItem>)
        }
        if (this.state.applications.length>0 && this.state.type==="c"){
            console.log(this.state.applications)
            applications = this.state.applications.map((appInfo, index) => <FreelancerListItem key={appInfo.role_id+appInfo.username} role_id={appInfo.role_id} name={appInfo.name} surname={appInfo.surname} resume_link={appInfo.resume_link} token={this.state.token} freelancer_user={appInfo.username} username={this.state.username} role_title={appInfo.title} onChange={this.setProjects}></FreelancerListItem>)
        }
        return <div style={this.style}>
            <h2 style={{wordWrap: "break-word"}}>Ihre ausstehenden Bewerbungen</h2>
            {applications}
        </div>
    }

    componentDidMount(){
        this.setProjects();
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.state.update!=nextProps.update){
            this.setProjects();
        }
    }
}
export default RightBar;