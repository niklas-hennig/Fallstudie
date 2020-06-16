import React, { Component } from 'react';
import axios from 'axios';

import RoleListItem from './listRoleItem';

class RightBar extends Component {
    constructor(props){
        super(props);
        this.state={
            username: this.props.username,
            type: this.props.type,
            token: this.props.token,
            comp_id: this.props.comp_id,
            applications: []
        }
        this.style = {
            position: 'absolute',
            width: '15%',
            left: '85%',
            height: '100%',
            backgroundColor: '#F4B41A',
        }
    }

    render(){
        let applications = ''
        console.log(this.state)
        if (this.state.applications.length>0){
            applications = this.state.applications.map((appInfo, index) => <RoleListItem key={index} role_id={appInfo.role_id} title={appInfo.title}> </RoleListItem>)
        }
        return <div style={this.style}>
            <h2>Ihre ausstehenden Bewerbungen</h2>
            {applications}
        </div>
    }

    componentDidMount(){
        axios.get('http://localhost:80/api/Application/Freelancer/'+this.state.username+'/'+this.state.token)
        .then(res => {
            console.log(res.data)
            this.setState({applications: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }
}
export default RightBar;