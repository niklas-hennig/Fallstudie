import React, { Component } from 'react';
import axios from "axios";
import ProjectRoleDetail from './RoleListItem';
import ApplicationListItem from './ApplicationListItem';
import AcceptedListItem from './AcceptedListItem';

import { Button, Card, CardHeader, CardContent, CardActions, MenuItem, Typography, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, TextField } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment'

import { Modal } from 'react-bootstrap'

class ProjectDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            area: null,
            anchorPopover: null
        }
        this.handleBack = this.handleBack.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.fetchAccepted = this.fetchAccepted.bind(this);
        this.addRole = this.addRole.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.createRole = this.createRole.bind(this);
        this.handleDeleteProjekt = this.handleDeleteProjekt.bind(this);
    }

    fetchInfo() {
        if (this.state.fetched !== this.props.project_id) {
            axios.get('http://localhost:80/api/Project/' + this.props.project_id)
                .then(res => {
                    this.setState({ info: res.data, fetched: res.data[0].project_id })
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    fetchSpecific(id, force) {
        if (this.state.fetched !== id || force) {
            axios.get('http://localhost:80/api/Project/' + id)
                .then(res => {
                    this.setState({ info: res.data, fetched: res.data[0].project_id })
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    fetchAccepted(id) {
        axios.get('http://localhost:80/api/Role/Accepted/All/' + id + '/' + this.state.token)
            .then(res => {
                this.setState({ accepted: res.data.rows })
            })
            .catch(err => console.log(err))
    }

    handleUpdate = (id) => {
        axios.get('http://localhost:80/api/Application/' + id)
            .then(res => {
                this.props.onUpdate();
                this.setState({ applications: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleBack = (event) => {
        this.props.onBack()
    }

    handleExpand = (event, id) => {
        this.fetchAccepted(id)
        this.setState({ applications: event })
    }

    addRole = (event) => {
        this.setState({ isCreating: true, anchorPopover: event.currentTarget })
    }

    closePopup() {
        this.setState({ isCreating: false })
    }

    createRole =(event)=> {
        event.preventDefault()
        axios.post('http://localhost:80/api/Role/' + this.state.token, {
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

    changehandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    fetchPrefences() {
        let pref = []
        let key = ''
        axios.get('http://localhost:80/api/Prefence/')
            .then(res => {
                for (key in res.data) {
                    pref.push(res.data[key]['pref_name'])
                }
                this.setState({ prefences: pref, area: pref[0] })

            })
    }

    handleDeleteProjekt() {
        axios.delete('http://localhost:80/api/Project/' + this.state.project_id + '/' + this.state.token + '/' + this.state.username)
            .then(res => {
                this.props.onBack();
            })
            .catch(err => console.error(err))
    }

    //Return card if no information was found
    getNoInformation() {
        return <Card
            variant="elevation"
        >
            <CardHeader
                title="Keine Informationen gefunden"
            >
            </CardHeader>
            <CardActions>
                <Button
                    variant="outline-primary"
                    onClick={this.handleBack}
                >Zurück
                </Button>
            </CardActions>
        </Card>
    }

    getRoleCreation() {
        return <Dialog
            open={this.state.isCreating}
            close={this.closePopup}
        >
            <form onSubmit={this.createRole}>
                <DialogContent>
                    <DialogTitle>Neue Rolle anlegen</DialogTitle>
                    <DialogContentText>

                        <TextField required name="title" helperText="Rollentitel" onChange={this.changehandler} />
                        <TextField required name="description" helperText="Beschreibung" onChange={this.changehandler} />
                        <TextField required name="requirements" helperText="Anforerungen" onChange={this.changehandler} />
                        <TextField required name="payment" type="number" helperText="Bezahlung" onChange={this.changehandler} />
                        <TextField required name="numberOfFreeancers" type="number" helperText="Anzahl an Freelancern" onChange={this.changehandler} />
                        <TextField required select name="area" value={this.state.area} helperText="Bereich" onChange={this.changeHandler}>
                            {this.state.prefences.map((pref, index) => <MenuItem key={index} value={pref}>{pref}</MenuItem>)}
                        </TextField>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.closePopup}
                    >
                        Schließen
                </Button>
                    <Button variant="contained" color="primary" type="submit">Speichern</Button>
                </DialogActions>
            </form>
        </Dialog >
    }


    render() {
        let project_info = null
        let appHead = ''
        let acceptedHead = ''
        let creationDialog = ''
        if (this.state.applications.length > 0)
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
        if (this.state.accepted.length > 0) {
            acceptedHead = <thead>
                <tr>
                    <th>Nutzername</th>
                    <th>Erfahung</th>
                    <th>Email</th>
                    <th>Lebenslauf</th>
                </tr>
            </thead>
        }
        if (this.state.isCreating) {

            creationDialog = this.getRoleCreation()
        }
        if (this.state.info) {
            if (this.state.info.length > 0) {
                project_info = this.state.info[0]

                return <Card
                    style={{ marginTop: "3%" }}
                >
                    <CardHeader
                        title={project_info.titel}
                    >
                    </CardHeader>
                    <CardContent >
                        <Button
                            variant="conained"
                            color="secondary"
                            startIcon={<ArrowBackIcon />}
                            onClick={this.handleBack}
                            style={{ marginBottom: "5%" }}
                        >
                            Zurück
                    </Button>
                        <Card>
                            <CardContent style={{ flex: 1, flexDirection: "row" }}>
                                <Typography variant="subtitle2">
                                    Start: {moment(project_info.start_date).format("DD.MM.YYYY")}
                                    <Typography variant="subtitle2">
                                    </Typography>
                                    Ende: {moment(project_info.end_date).format("DD.MM.YYYY")}
                                </Typography>
                                <Typography variant="caption">
                                    Bewerbungsende: {moment(project_info.application_limit).format("DD.MM.YYYY")}
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardContent>

                    <div style={{ backgroundColor: 'lightgray' }}>

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

                </Card>
            }
        } else return this.getNoInformation()

    }

    componentDidMount() {
        this.fetchInfo();
        this.fetchPrefences();
    }



    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.project_id !== nextProps.project_id)
            this.fetchSpecific(nextProps.project_id);
        this.setState({ project_id: nextProps.project_id, applications: [], accepted: [] })


    }
}

export default ProjectDetail;