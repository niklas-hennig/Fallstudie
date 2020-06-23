import React, { Component } from 'react';
import axios from "axios";
import moment from 'moment'

import RoleCreationItem from './RoleCreationItem';

class ProjectCreate extends Component {
    constructor(props){
        super(props)
        this.state={
            username: this.props.username,
            token: this.props.token,
            comp_id: this.props.comp_id,
            
            //Project
            pr_titel: '',
            start_date: null,
            end_date: null,
            application_limit: null,

            //Roles
            roles: [{title: '', description: '', requirements: '', payment: '', area: '', numberOfFreeancers: 0, internal_id: 0}],

            //Functional
            prefences: [],
            dateError: null
        }
        this.style ={
            position: 'absolute',
            left: '15%',
            width: '70%',
            height: '100%'
        }
        this.changeHandler=this.changeHandler.bind(this);
        this.addRole=this.addRole.bind(this);
        this.roleDeleteHandler=this.roleDeleteHandler.bind(this);
        this.roleChangeHandler=this.roleChangeHandler.bind(this);
        this.submitAll=this.submitAll.bind(this);

    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    roleChangeHandler = (id, name, value) => {
        if (id<this.state.roles.length){
        let roles = this.state.roles
        roles[id][name] = value
        }
    } 

    roleDeleteHandler = (id)=>{
        let roles = this.state.roles
        roles.splice(id, 1)
        this.setState({roles: roles})
    }

    addRole(){
        let roles = this.state.roles
        roles.push({title: null, description: null, requirements: null, payment: null, area: this.state.prefences[0], numberOfFreeancers:null, internal_id: roles.length})
        this.setState({roles: roles})
    }

    fetchPrefences() {
        let pref = []
        let key = ''
        axios.get('http://localhost:80/api/Prefence/')
        .then(res => {
            for(key in res.data){
                pref.push(res.data[key]['pref_name'])
            }
            this.setState({prefences: pref})

        })
    }

    submitAll(){
        console.log("submitting")
        console.log(this.state.roles)
        if(!this.state.start_date||!this.state.end_date||!this.state.application_limit){
            this.setState({dateError: true})
            return
        }
        let start = moment(this.state.start_date)
        let end = moment(this.state.end_date)
        let appLimit = moment(this.state.application_limit)
        if(start>end || appLimit>start) {
            this.setState({dateError: true})
            return}
        axios.post('http://localhost:80/api/Project/'+this.state.token, {
            title: this.state.pr_titel,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            app_limit: this.state.application_limit,
            comp_id: this.state.comp_id
        })
        .then(res => {
            let promises = []
            this.state.roles.forEach((role) => {
                promises.push(axios.post('http://localhost:80/api/Role/'+this.state.token,{
                    title: role.title,
                    description: role.description,
                    reqs: role.requirements,
                    area: role.area,
                    payment: role.payment,
                    numberOfFreeancers: role.numberOfFreeancers,
                    project_id: res.data
                }))
            })
            Promise.all(promises).then((res) => {
                this.props.onBack()
            })
            .catch(err => console.log(err))
            
        })
        .catch(err => console.error(err))
    }

    
    
    render(){
        let dateErr = ''
        if(this.state.dateError) dateErr=<p>Bitte valide Daten eingeben</p>
        if (this.state.prefences.length>0) console.log("creating with prefences")
        return <div style={this.style}>
            <h2>Ihr neues Projekt</h2>
            <button onClick={this.props.onBack}>Zurück</button>
            <form style={{backgroundColor:"gray"}}>
                <input type="text" placeholder="Projekttitel" name="pr_titel" onChange={this.changeHandler}/>
                <label htmlFor="start_date">Start:</label>
                <input type="date" name="start_date" onChange={this.changeHandler}/>
                <label htmlFor="end_date">Ende:</label>
                <input type="date" name="end_date" onChange={this.changeHandler}/><br></br>
                <label htmlFor="application_limit">Bewerbungende:</label><br></br>
                <input type="date" name="application_limit" onChange={this.changeHandler}/>
                {dateErr}
            </form>
            <button onClick={this.addRole}>Neue Rolle</button>
            <table>
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Beschreibung</th>
                        <th>Vorraussetzungen</th>
                        <th>Bezahlung</th>
                        <th>Gebiet</th>
                        <th>Anzahl</th>
                    </tr>
                </thead>
                {this.state.roles.map((role, index) => <RoleCreationItem key={role.internal_id} id={index} prefences={this.state.prefences} onChange={this.roleChangeHandler} onDelete={this.roleDeleteHandler}></RoleCreationItem>)}
            </table>
            <button onClick={this.submitAll} >Anlegen</button>
        </div>
    }

    componentDidMount(){
        this.fetchPrefences();
    }
}

export default ProjectCreate;