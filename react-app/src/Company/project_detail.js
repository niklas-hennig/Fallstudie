import React, { Component } from 'react';
import axios from "axios";
import ProjectRoleDetail from './role_detail';

class ProjectDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            project_id: this.props.project_id,
            token: this.props.token,
            info: null
        }
        this.style ={
            position: 'absolute',
            left: '15%',
            width: '70%',
            height: '100%'
        }
        this.handleBack=this.handleBack.bind(this);
        this.handleExpand=this.handleExpand.bind(this);
    }

    handleBack = (event) =>{
        this.props.onBack()
    }

    handleExpand = (event) => {
        console.log(event)
    }

    render(){
        let project_info = null
        let applications = ''
        if(this.state.info) {
            project_info = this.state.info[0]
            let roles = ''
            if(this.state.fetch_applications){

            }

            return <div style={this.style}>
                <button onClick={this.handleBack}>Zurück</button>
                <h2>{project_info.titel}</h2>
                <p>Start: {project_info.start_date.substring(8,10)}.{project_info.start_date.substring(5,7)}.{project_info.start_date.substring(0,4)}</p>
                <p>Ende: {project_info.end_date.substring(8,10)}.{project_info.end_date.substring(5,7)}.{project_info.end_date.substring(0,4)}</p>
                <p>Bewerbungsende: {project_info.application_limit.substring(8,10)}.{project_info.application_limit.substring(5,7)}.{project_info.application_limit.substring(0,4)}</p>
                {this.state.info.map((role, index) => <ProjectRoleDetail key={index} info={role}></ProjectRoleDetail>)}
            </div>
        }else{
            return <div style={this.style}>
                <button onClick={this.handleBack}>Zurück</button>
                <h2>Keine Informationen gefunden</h2>
            </div>
        }
    }

    componentDidMount(){
        axios.get('http://localhost:80/api/Project/'+this.state.project_id)
        .then(res=>{
            this.setState({info: res.data})
        })
        .catch(err => {
            console.error(err)
        })
    }
}

export default ProjectDetail;