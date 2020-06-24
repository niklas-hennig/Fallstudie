import React, { Component } from 'react';
import axios from "axios";
import ProjectRoleDetail from './RoleListItem';
import ApplicationListItem from './ApplicationListItem';
import AcceptedListItem from './AcceptedListItem';
import { Modal} from 'react-bootstrap'
import { Button } from 'react-bootstrap'

class ProjectDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            project_id: this.props.project_id,
            token: this.props.token,
            username: this.props.username,
            info: null,
            applications: [],
            accepted: [],
            fetched: null,
            isCreating: false,

            title: '',
            description: '',
            requirements: '',
            payment: 0,
            numberOfFreeancers: 0,
            area: null
        }
        this.handleBack=this.handleBack.bind(this);
        this.handleExpand=this.handleExpand.bind(this);
        this.handleUpdate=this.handleUpdate.bind(this);
        this.fetchAccepted=this.fetchAccepted.bind(this);
        this.addRole=this.addRole.bind(this);
        this.closePopup=this.closePopup.bind(this);
        this.createRole=this.createRole.bind(this);
        this.handleDeleteProjekt=this.handleDeleteProjekt.bind(this);
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

    fetchSpecific(id, force){
        if(this.state.fetched!==id||force){
            axios.get('http://localhost:80/api/Project/'+id)
            .then(res=>{
                console.log("fetched info")
                console.log(res.data)
                this.setState({info: res.data, fetched: res.data[0].project_id})
            })
            .catch(err => {
                console.error(err)
            })
        }
    }

    fetchAccepted(id){
        axios.get('http://localhost:80/api/Role/Accepted/All/'+id+'/'+this.state.token)
        .then(res => {
            console.log(res.data.rows)
            this.setState({accepted: res.data.rows})})
        .catch(err => console.log(err))
    }

    handleUpdate = (id) =>{
        console.log("updating with id:")
        console.log(id)
        axios.get('http://localhost:80/api/Application/'+id)
        .then(res => {
            this.props.onUpdate();
            this.setState({applications: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleBack = (event) =>{
        this.props.onBack()
    }

    handleExpand = (event, id) => {
        this.fetchAccepted(id)
        this.setState({applications: event})
    }

    addRole(){
        this.setState({isCreating: true})
    }

    closePopup(){
        this.setState({isCreating: false})
    }

    createRole(){
        axios.post('http://localhost:80/api/Role/'+this.state.token,{
                    title: this.state.title,
                    description: this.state.description,
                    reqs: this.state.requirements,
                    area: this.state.area,
                    payment: this.state.payment,
                    numberOfFreeancers: this.state.numberOfFreeancers,
                    project_id: this.state.project_id
                })
                .then(res => {
                    console.log(res)
                    this.closePopup();
                    this.fetchSpecific(this.state.project_id, true);
                })
                .catch(err => console.error(err))
        
    }

    changehandler=(event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    fetchPrefences() {
        let pref = []
        let key = ''
        axios.get('http://localhost:80/api/Prefence/')
        .then(res => {
            for(key in res.data){
                pref.push(res.data[key]['pref_name'])
            }
            this.setState({prefences: pref, area: pref[0]})

        })
    }

    handleDeleteProjekt(){
        axios.delete('http://localhost:80/api/Project/'+this.state.project_id+'/'+this.state.token+'/'+this.state.username)
        .then(res => {
            console.log(res)
            this.props.onBack();
        })
        .catch(err => console.error(err))
    }


    render(){
        let project_info = null
        let appHead = ''
        let acceptedHead = ''
        let creationDialog = ''
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
        if(this.state.accepted.length>0){
        acceptedHead = <thead>
            <tr>
                <th>Nutzername</th>
                <th>Erfahung</th>
                <th>Email</th>
                <th>Lebenslauf</th>
            </tr>
        </thead>
        }
        if(this.state.isCreating){
            creationDialog = <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Neue Rolle</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <label htmlFor="title">Titel</label>
                        <input type="text" name="title" onChange={this.changehandler}></input>
                        <label htmlFor="description">Beschreibung</label>
                        <input type="text" name="description" onChange={this.changehandler}></input>
                        <label htmlFor="requirements">Anforderungen</label>
                        <input type="text" name="requirements" onChange={this.changehandler}></input>
                        <label htmlFor="payment">Bezahlung</label>
                        <input type="number" name="payment" onChange={this.changehandler}></input>
                        <label htmlFor="numberOfFreeancers">Anzahl an Freelancern</label>
                        <input type="number" name="numberOfFreeancers" onChange={this.changehandler}></input>
                        <label htmlFor="area">Bereich</label>
                        <select name="area" onChange={this.changehandler}>
                            {this.state.prefences.map((pref, index) => <option key={index} value={pref}>{pref}</option>)}
                        </select>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closePopup}>Schließen</Button>
                    <Button variant="primary" onClick={this.createRole}>Speichern</Button>
                </Modal.Footer>
            </Modal.Dialog>
        }
        if(this.state.info) {
            if (this.state.info.length>0){
                project_info = this.state.info[0]

                return <React.Fragment>
            <div>
                <div style={{backgroundColor: 'lightgray'}}>
                    <button onClick={this.handleBack}>Zurück</button>
                    <h2>{project_info.titel}</h2>
                    <p>Start: {project_info.start_date.substring(8,10)}.{project_info.start_date.substring(5,7)}.{project_info.start_date.substring(0,4)}</p>
                    <p>Ende: {project_info.end_date.substring(8,10)}.{project_info.end_date.substring(5,7)}.{project_info.end_date.substring(0,4)}</p>
                    <p>Bewerbungsende: {project_info.application_limit.substring(8,10)}.{project_info.application_limit.substring(5,7)}.{project_info.application_limit.substring(0,4)}</p>
                    <button onClick={this.handleDeleteProjekt}>Projekt löschen</button>
                </div>
                <button onClick={this.addRole}>Rolle hinzufügen</button>
                {creationDialog}
                <table>
                    <thead>
                        <tr>
                            <th>Rolle</th>
                            <th>Anzahl</th>
                            <th>Beschreibung</th>
                            <th>Neue Bewerbungen</th>
                            <th>Bisher angenommene Bewerbungen</th>
                        </tr>
                    </thead>
                    {this.state.info.map((role, index) => <ProjectRoleDetail key={index} info={role} token={this.state.token} handleExpand={this.handleExpand}></ProjectRoleDetail>)}
                </table>
                <table>
                    {appHead}
                    {this.state.applications.map((app, index) => <ApplicationListItem key={index} info={app} token={this.state.token} onReject={this.handleUpdate}></ApplicationListItem>)}
                </table>
                <h3>Ihre angenommenen Bewerbungen</h3>
                <table>
                    {acceptedHead}
                    {this.state.accepted.map((freelancer_info, index) => <AcceptedListItem key={index} info={freelancer_info} ></AcceptedListItem>)}
                </table>
                    
                </div>
                </React.Fragment>
            }
        }
        return <div>
            <button onClick={this.handleBack}>Zurück</button>
            <h2>Keine Informationen gefunden</h2>
        </div>
    }

    componentDidMount(){
        this.fetchInfo();
        this.fetchPrefences();
    }



    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.state.project_id!==nextProps.project_id)
            this.fetchSpecific(nextProps.project_id);
            this.setState({project_id: nextProps.project_id, applications: [], accepted:[]})

            
    }
}

export default ProjectDetail;