import React, { Component } from 'react';
import Calendar from 'react-calendar'
import Axios from 'axios';

import RoleListItem from './listRoleItem';

class LeftBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            type: this.props.type,
            token: this.props.token,
            comp_id: this.props.comp_id,
            projects: [],
            dates: []
        }
        this.style = {
            position: 'absolute',
            width: '15%',
            height: '100%',
            backgroundColor: '#F4B41A',
        }
        this.makeRoleDivs = this.makeRoleDivs.bind(this);
        this.convertToDates=this.convertToDates.bind(this);
        this.handleRoleClick=this.handleRoleClick.bind(this);
    }

    handleRoleClick = (event) => {
        console.log("handeling"+event)
        this.props.onRoleSelect(event);
    }

    makeRoleDivs(roleInfo){
        return <div onClick={this.handleRoleClick(roleInfo.role_id)}>
            <h3>{roleInfo.title}</h3>
            <p>{roleInfo.start_date}</p>
        </div>
    }

    convertToDates(){
        let key=0
        let dates = []
        let date = null
        let start = null
        let end = null
        for(key in this.state.projects){
            start = new Date(this.state.projects[key]['start_date'])
            end = new Date(this.state.projects[key]['end_date'])
            date = {start: start, end: end}
            dates.push(date)
        }
        this.setState({dates:dates})
    }

    render(){
        let cal = ''
        let calTitle = ''
        if(this.state.type=='f'){
            cal = <Calendar />
            calTitle = <h2>Ihr Monat</h2>
        }
        let noProjects = ''
        if (this.state.projects.length==0) noProjects=<div><h3>Keine Projekte vorhanden</h3></div>
        let roleInfo = null
        return <div style={this.style}>
            {calTitle}
            {cal}
            <h2>Ihre Projekte</h2>
            {this.state.projects.map((roleInfo, index) => <RoleListItem key={index} role_id={roleInfo.role_id} title={roleInfo.title} start_date={roleInfo.start_date} handleClick={this.handleRoleClick} mode="left"></RoleListItem>
            )}
            {noProjects}
        </div>
    }

    componentDidMount(){
        if(this.state.type=='f'){
            let date = new Date()
            Axios.get('http://localhost:80/api/Role/Timeline/'+this.state.username+'/'+this.state.token+'/2020-05-16')
            .then(res => {
                this.setState({projects: res.data})
                this.convertToDates();
            })
            .catch(err => console.log(err))
        }
    }
}
export default LeftBar;