import React, { Component } from 'react';
import Calendar from 'react-calendar'
import Axios from 'axios';
import moment from 'moment'

import RoleListItem from './listRoleItem';
import ListProjectItem from './listProjectItem';
import { Card, CardHeader, CardContent, Paper } from '@material-ui/core';

class LeftBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            type: this.props.type,
            token: this.props.token,
            comp_id: this.props.comp_id,
            projects: [],
            dates: [],
            updated: null,
            calendar: ''
        }
        this.style = {
            marginBottom: "20px",
            paddingBottom: "6px"
        }
        this.fetchInfo=this.fetchInfo.bind(this);
        this.convertToDates=this.convertToDates.bind(this);
        this.handleRoleClick=this.handleRoleClick.bind(this);
        this.handleProjectClick=this.handleProjectClick.bind(this);
    }

    //Fill informations according to role from backend-call
    fetchInfo(){
        if(this.state.type==='f'){
            let date = new Date()
            Axios.get('http://localhost:80/api/Roles/Timeline/'+this.state.username+'/'+this.state.token+'/'+moment(new Date()).format("YYYY-MM-")+'01')
            .then(res => {
                this.setState({projects: res.data})
                this.convertToDates();
            })
            .catch(err => console.log(err))
        }else{
            Axios.get('http://localhost:80/api/Projects/Running/'+this.state.username+'/'+this.state.token)
            .then(res => {
                this.setState({projects: res.data})
            })
            .catch(err => console.log(err))
        }
    }

    handleRoleClick = (event) => {
        this.props.onRoleSelect(event, false);
    }

    handleProjectClick = (event) => {
        this.props.onProjectSelected(event);
    }


    //Fill array with all dates in specified range
    getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    //Fill date-array for calendar blocking
    convertToDates(){
        let key=0
        let i = 0
        let dates = []
        let dates_full = []
        let date = null
        let start = null
        let end = null
        for(key in this.state.projects){
            start = this.state.projects[key]['start_date']
            end = this.state.projects[key]['end_date']
            date = {start: start, end: end}
            dates.push(date)
        }
        let res = null
        for(key in dates){
            res = this.getDates(dates[0].start, dates[0].end)
            for(i in res)
                dates_full.push(res[i])
        }
        this.setState({dates:dates_full})
        this.setState({calendar: <Calendar 
            tileClassName={({ date, view }) => {
                if(this.state.dates.find(x=>x===moment(date).format("YYYY-MM-DD"))){
                 return  'highlight'
                }
              }}
            tileDisabled={({ date }) => date.getDay() === 0}
            />})
    }

    render(){
        let title = 'Angenommene Projekte'
        if (this.state.type==='c') title='Laufende Projekte'
        let calCard = ''
        if(this.state.type=='f'){
            calCard = <Card 
            variant="outlined"
            style={{marginTop: "5%", marginLeft: "2%"}}>
                <CardHeader title="Ausgewählter Zeitraum"></CardHeader>
                <CardContent>
                    {this.state.calendar}
                </CardContent>
            </Card>
        }
        let noProjects = ''
        if (this.state.projects.length==0) noProjects=<div><h3>Keine Projekte vorhanden</h3></div>
        let children = null
        if(this.state.type==="f") children = this.state.projects.map((roleInfo) => <RoleListItem key={roleInfo.role_id} role_id={roleInfo.role_id} title={roleInfo.title} start_date={roleInfo.start_date} end_date={roleInfo.end_date} handleClick={this.handleRoleClick} mode="left"></RoleListItem>)
        else children = this.state.projects.map((project) => <ListProjectItem key={project.project_id} project_id={project.project_id} title={project.titel} start_date={project.start_date} end_date={project.end_date} handleClick={this.handleProjectClick}></ListProjectItem>)
        return <Paper 
        variant="elevation"
        style={this.style}
        >
            {calCard}
            <h2>{title}</h2>
            {children}
            {noProjects}
        </Paper>
    }

    componentDidMount(){
        this.fetchInfo();
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.fetchInfo()
        this.setState({updated: nextProps.updated})
    }
}
export default LeftBar;