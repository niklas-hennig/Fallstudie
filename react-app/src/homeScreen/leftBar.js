import React, { Component } from 'react';
import Calendar from 'react-calendar'
import Axios from 'axios';
import moment from 'moment'

import RoleListItem from './listRoleItem';
import ListProjectItem from './listProjectItem';

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
            position: 'absolute',
            width: '15%',
            height: '100%',
            backgroundColor: '#F4B41A',
        }
        this.fetchInfo=this.fetchInfo.bind(this);
        this.convertToDates=this.convertToDates.bind(this);
        this.handleRoleClick=this.handleRoleClick.bind(this);
        this.handleProjectClick=this.handleProjectClick.bind(this);
    }

    fetchInfo(){
        if(this.state.type==='f'){
            let date = new Date()
            Axios.get('http://localhost:80/api/Role/Timeline/'+this.state.username+'/'+this.state.token+'/2020-05-16')
            .then(res => {
                this.setState({projects: res.data})
                this.convertToDates();
            })
            .catch(err => console.log(err))
        }else{
            Axios.get('http://localhost:80/api/Project/'+this.state.username+'/'+this.state.token)
            .then(res => {
                console.log("fetched:")
                console.log(res.data)
                this.setState({projects: res.data})
            })
            .catch(err => console.log(err))
        }
    }

    handleRoleClick = (event) => {
        this.props.onRoleSelect(event);
    }

    handleProjectClick = (event) => {
        this.props.onProjectSelected(event);
    }

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
        console.log("set dates")
        console.log(dates)
        console.log(dates_full)
        this.setState({calendar: <Calendar 
            tileClassName={({ date, view }) => {
                console.log(moment(date).format("YYYY-MM-DD").toString())
                console.log(dates_full.find(x=>x===moment(date).format("YYYY-MM-DD")))
                if(this.state.dates.find(x=>x===moment(date).format("YYYY-MM-DD"))){
                 return  'highlight'
                }
              }}
            tileDisabled={({ date }) => date.getDay() === 0}
            />})
    }

    render(){
        let cal = ''
        let calTitle = ''
        if(this.state.type=='f'){
            cal = this.state.calendar
            calTitle = <h2>Ihr Monat</h2>
        }
        let noProjects = ''
        if (this.state.projects.length==0) noProjects=<div><h3>Keine Projekte vorhanden</h3></div>
        let children = null
        if(this.state.type==="f") children = this.state.projects.map((roleInfo, index) => <RoleListItem key={index} role_id={roleInfo.role_id} title={roleInfo.title} start_date={roleInfo.start_date} handleClick={this.handleRoleClick} mode="left"></RoleListItem>)
        else children = this.state.projects.map((project, index) => <ListProjectItem key={index} project_id={project.project_id} title={project.titel} start_date={project.start_date} handleClick={this.handleProjectClick}></ListProjectItem>)
        return <div style={this.style}>
            {calTitle}
            {cal}
            <h2>Ihre Projekte</h2>
            {children}
            {noProjects}
        </div>
    }

    componentDidMount(){
        this.fetchInfo();
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        console.log("leftbar will receive props:")
        console.log(nextProps)
        console.log(this.state)
        //if(this.state.updated!==nextProps.updated){
            console.log("left bar will fetch")
            this.fetchInfo()
            this.setState({updated: nextProps.updated})
        //}
    }
}
export default LeftBar;