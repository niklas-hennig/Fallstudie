import React, { Component } from 'react';
import axios from "axios";
import moment from 'moment'

import RoleCreationItem from './RoleCreationItem';
import { Card, CardHeader, IconButton, CardContent, TextField, Typography, TableContainer, Table, TableCell, CardActions } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Button, MenuItem, TableHead, TableRow, TableBody } from '@material-ui/core'
import BackspaceIcon from '@material-ui/icons/Backspace';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

class ProjectCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            token: this.props.token,
            comp_id: this.props.comp_id,

            //Project
            pr_titel: '',
            start_date: null,
            end_date: null,
            application_limit: null,

            //Roles
            roles: [],

            //New rolw properties
            title: '',
            description: '',
            requirements: '',
            payment: '',
            area: '',
            numberOfFreeancers: 0,

            //Functional
            prefences: [],
            dateError: null,
            isCreating: false
        }
        this.style = {
            position: 'absolute',
            left: '15%',
            width: '70%',
            height: '100%'
        }
        this.inputStyle = {
            margin: "1%",
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.addRole = this.addRole.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.roleDeleteHandler = this.roleDeleteHandler.bind(this);
        this.roleChangeHandler = this.roleChangeHandler.bind(this);
        this.submitAll = this.submitAll.bind(this);

    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    roleChangeHandler = (id, name, value) => {
        if (id < this.state.roles.length) {
            let roles = this.state.roles
            roles[id][name] = value
        }
    }

    roleDeleteHandler = (id) => {
        let roles = this.state.roles
        roles.splice(id, 1)
        this.setState({ roles: roles })
    }

    addRole() {
        this.setState({ isCreating: true })
    }

    closePopup() {
        this.setState({ isCreating: false })
    }
    createRole = (event) => {
        event.preventDefault()
        this.setState({ title: '', description: '', requirements: '', payment: '', area: '', numberOfFreeancers: 0, })
        let roles = this.state.roles
        roles.push({
            title: this.state.title,
            description: this.state.description,
            requirements: this.state.requirements,
            payment: this.state.payment,
            area: this.state.area,
            numberOfFreeancers: this.state.numberOfFreeancers, internal_id: roles.length
        })
        this.setState({ roles: roles })
        this.closePopup();

    }

    fetchPrefences() {
        let pref = []
        let key = ''
        axios.get('http://localhost:80/api/Prefences/')
            .then(res => {
                for (key in res.data) {
                    pref.push(res.data[key]['pref_name'])
                }
                this.setState({ prefences: pref })

            })
    }

    submitAll() {
        if (!this.state.start_date || !this.state.end_date || !this.state.application_limit) {
            this.setState({ dateError: true })
            return
        }
        let start = moment(this.state.start_date)
        let end = moment(this.state.end_date)
        let appLimit = moment(this.state.application_limit)
        if (start > end || appLimit > start) {
            this.setState({ dateError: true })
            return
        }
        axios.post('http://localhost:80/api/Projects/' + this.state.token, {
            title: this.state.pr_titel,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            app_limit: this.state.application_limit,
            comp_id: this.state.comp_id
        })
            .then(res => {
                let promises = []
                this.state.roles.forEach((role) => {
                    promises.push(axios.post('http://localhost:80/api/Roles/' + this.state.token, {
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

    getRoleCreation() {
        return <Dialog
            open={this.state.isCreating}
            close={this.closePopup}
        >
            <form onSubmit={this.createRole}>
                <DialogContent>
                    <DialogTitle>Neue Rolle anlegen</DialogTitle>
                    <DialogContentText>

                        <TextField required name="title" label="Rollentitel" value={this.state.title} onChange={this.changeHandler} />
                        <TextField required name="description" label="Beschreibung" value={this.state.description} onChange={this.changeHandler} />
                        <TextField required name="requirements" label="Anforderungen" value={this.state.requirements} onChange={this.changeHandler} />
                        <TextField required name="payment" type="number" label="Bezahlung" value={this.state.payment} onChange={this.changeHandler} />
                        <TextField required name="numberOfFreeancers" type="number" value={this.state.numberOfFreeancers} label="Anzahl an Freelancern" onChange={this.changeHandler} />
                        <TextField required select name="area" value={this.state.area} label="Bereich" onChange={this.changeHandler}>
                            {this.state.prefences.map((pref, index) => <MenuItem key={index} value={pref}>{pref}</MenuItem>)}
                        </TextField>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="error"
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
        let dateErr = ''
        if (this.state.dateError) dateErr = <Typography variant="caption">Bitte valide Daten eingeben</Typography>
        let creationDialog = this.getRoleCreation();
        return <Card
            variant="elevation"
            style={{ marginTop: "4%", marginBottom: "5%" }}
        >
            <CardHeader
                title="Ihr neues Projekt"
                action={
                    <IconButton aria-label="Zurück"
                        onClick={this.props.onBack}
                    >
                        <BackspaceIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <Card>
                    <TextField required helperText="Projekttitel" name="pr_titel" value={this.state.pr_titel} onChange={this.changeHandler} />
                    <br />
                    <TextField required style={this.inputStyle} label="Startdatum" type="date" value={this.state.start_date} format='YYYY-MM-DD'
                        name="start_date" onChange={this.changeHandler} InputLabelProps={{ shrink: true }} />
                    <TextField required style={this.inputStyle} label="Enddatum" type="date" value={this.state.end_date} format='YYYY-MM-DD'
                        name="end_date" onChange={this.changeHandler} InputLabelProps={{ shrink: true }} />
                    <TextField required style={this.inputStyle} label="Bewerbungsende" type="date" value={this.state.application_limit} format='YYYY-MM-DD'
                        name="application_limit" onChange={this.changeHandler} InputLabelProps={{ shrink: true }} />
                    {dateErr}
                </Card>
            </CardContent>
            <Card>
                <CardHeader
                    title="Rollen"
                    aria-label="Neue Rolle anlegen"
                    action={<IconButton onClick={this.addRole} size="medium" style={{ backgroundColor: "#c2c2c2" }}>
                        <AddIcon />
                    </IconButton>} />
                <CardContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Titel</TableCell>
                                <TableCell>Beschreibung</TableCell>
                                <TableCell>Vorraussetzungen</TableCell>
                                <TableCell>Bezahlung</TableCell>
                                <TableCell>Gebiet</TableCell>
                                <TableCell>Anzahl</TableCell>
                                <TableCell>Rolle entfernen</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.roles.map((role, index) => <RoleCreationItem key={role.internal_id} info={role} onChange={this.roleChangeHandler} onDelete={this.roleDeleteHandler}></RoleCreationItem>)}
                        </TableBody>
                    </Table>
                </TableContainer>
                {creationDialog}
                </CardContent>
                <CardActions style={{ float: "right" }}>
                    <Button endIcon={<SaveIcon />} onClick={this.submitAll}>Speichern</Button>
                </CardActions>
            </Card>
        </Card>
    }

    componentDidMount() {
        this.fetchPrefences();
    }
}

export default ProjectCreate;