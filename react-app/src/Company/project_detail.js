import React, { Component } from 'react';
import axios from "axios";
import ProjectRoleDetail from './RoleListItem';
import ApplicationListItem from './ApplicationListItem';

class ProjectDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            project_id: this.props.project_id,
            token: this.props.token,
            info: null,
            applications: [],
            fetched: null
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

    fetchInfo(){
        if(this.state.fetched!==this.props.project_id){
            axios.get('http://localhost:80/api/Project/'+this.props.project_id)
            .then(res=>{
                this.setState({info: res.data, fetched: res.data[0].project_id})
            })
            .catch(err => {
                console.error(err)
            })
        }
    }

    fetchSpecific(id){
        if(this.state.fetched!==id){
            axios.get('http://localhost:80/api/Project/'+id)
            .then(res=>{
                this.setState({info: res.data, fetched: res.data[0].project_id})
            })
            .catch(err => {
                console.error(err)
            })
        }
    }

    handleBack = (event) =>{
        this.props.onBack()
    }

    handleExpand = (event) => {
        console.log("handeling expand" + event)
        this.setState({applications: event})
    }

    render(){
        let project_info = null
        let appHead = ''
        if(this.state.applications.length>0)
        appHead = <thead>
        <tr>
            <th>Nutzername</th>
            <th>Erfahung</th>
            <th>Email</th>
            <th>Lebenslauf</th>
            <th>Annehmen</th>
            <th>Bewerbung löschen</th>
        </tr>
    </thead>
        if(this.state.info) {
            if (this.state.info.length>0){
                project_info = this.state.info[0]

                return <div style={this.style}>
                <div style={{backgroundColor: 'lightgray'}}>
                    <button onClick={this.handleBack}>Zurück</button>
                    <h2>{project_info.titel}</h2>
                    <p>Start: {project_info.start_date.substring(8,10)}.{project_info.start_date.substring(5,7)}.{project_info.start_date.substring(0,4)}</p>
                    <p>Ende: {project_info.end_date.substring(8,10)}.{project_info.end_date.substring(5,7)}.{project_info.end_date.substring(0,4)}</p>
                    <p>Bewerbungsende: {project_info.application_limit.substring(8,10)}.{project_info.application_limit.substring(5,7)}.{project_info.application_limit.substring(0,4)}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Rolle</th>
                            <th>Anzahl</th>
                            <th>Beschreibung</th>
                            <th>Neue Bewerbungen</th>
                        </tr>
                    </thead>
                    {this.state.info.map((role, index) => <ProjectRoleDetail key={index} info={role} handleExpand={this.handleExpand}></ProjectRoleDetail>)}
                </table>
                <table>
                    {appHead}
                </table>
                    {this.state.applications.map((app, index) => <ApplicationListItem key={index} info={app}></ApplicationListItem>)}
                </div>
            }
        }
        return <div style={this.style}>
            <button onClick={this.handleBack}>Zurück</button>
            <h2>Keine Informationen gefunden</h2>
        </div>
    }

    componentDidMount(){
        this.fetchInfo();
    }



    componentWillReceiveProps(nextProps){
        if(this.state.project_id!==nextProps.project_id)
            this.fetchSpecific(nextProps.project_id);
            this.setState({project_id: nextProps.project_id})

            
    }
}

export default ProjectDetail;