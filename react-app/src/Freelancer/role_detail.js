import React, { Component } from 'react';
import axios from 'axios';

class RoleDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            role_id: this.props.role_id,
            token: this.props.token,
            username: this.props.username,
            info: null
        }
        this.style ={
            position: 'absolute',
            left: '15%',
            width: '70%',
            height: '100%'
        }
        this.handleBack=this.handleBack.bind(this);
        this.handleApply=this.handleApply.bind(this);
        this.fetchInfo=this.fetchInfo.bind(this);
    }

    fetchInfo(role_id){
        axios.get('http://localhost:80/api/Role/Freelancer/All/'+role_id+'/'+this.state.token)
        .then(res => {
            this.setState({info: res.data})
        })
        .catch(err => console.error(err))
    }

    handleBack = (event) =>{
        this.props.onBack()
    }

    handleApply = (event)=>{
        axios.post('http://localhost:80/api/Application/'+this.state.role_id+'/'+this.state.username+'/'+this.state.token)
        .then(res => this.props.onApply())
        .catch(err => console.error(err))
        
    }

    render(){
        let project_title = ''
        let start_date = ''
        let end_date = ''
        let bewerbungsfrist = ''
        let role_title = ''
        let role_description = ''
        let payment = ''
        let requirements = ''
        if (this.state.info){
            project_title=this.state.info.titel
            start_date=this.state.info.start_date.substring(8,10)+'.'+this.state.info.start_date.substring(5,7)+'.'+this.state.info.start_date.substring(0,4)
            end_date=this.state.info.end_date.substring(8,10)+'.'+this.state.info.end_date.substring(5,7)+'.'+this.state.info.end_date.substring(0,4)
            bewerbungsfrist=this.state.info.application_limit.substring(8,10)+'.'+this.state.info.application_limit.substring(5,7)+'.'+this.state.info.application_limit.substring(0,4)
            role_title = this.state.info.title
            role_description = this.state.info.description
            payment = this.state.info.payment
            requirements = this.state.requirements
        }


        return <div style={this.style}>
            <div>
                <button onClick={this.handleBack}>Zurück</button>
                <h2>Projekttitel: {project_title}</h2>
                <p>Start: {start_date}</p>
                <p>Ende: {end_date}</p>
                <p>Bewerbungsfrist: {bewerbungsfrist}</p>
            </div>
            <div>
                <h2>Rollentitel: {role_title}</h2>
                <p>Beschreibung: {role_description}</p>
                <p>Bezahlung: {payment}</p>
                <p>Vorraussetzungen: {requirements}</p>
            </div>
            <button onClick={this.handleApply}>Jetzt bewerben</button>
        </div>
    }

    componentDidMount(){
        this.fetchInfo(this.state.role_id)
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.state.role_id!==nextProps.role_id)
            this.fetchInfo(nextProps.role_id)
            this.setState({role_id: nextProps.role_id})
    }
}

export default RoleDetail;