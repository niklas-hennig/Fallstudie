import React, { Component } from 'react';
import axios from "axios";
import { TableRow, TableCell, TableHead, TableContainer, IconButton, Collapse, Typography, Box, Table, TableBody } from '@material-ui/core';
import AcceptedListItem from './AcceptedListItem';
import ApplicationListItem from './ApplicationListItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


class ProjectRoleDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: this.props.info,
            applications: [],
            showApplications: false,
            accepted: [],
            token: this.props.token,
            isExpanded: true
        }
        this.fetchAccepted = this.fetchAccepted.bind(this);
        this.fetchApplications = this.fetchApplications.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
    }

    fetchAccepted(id) {
        console.log("setting")
        console.log(id)
        axios.get('http://localhost:80/api/Roles/Accepted/All/' + id + '/' + this.state.token)
            .then(res => {
                this.setState({ accepted: res.data.rows })
            })
            .catch(err => console.log(err))
    }

    fetchApplications() {
        axios.get('http://localhost:80/api/Applications/' + this.state.info.role_id)
            .then(res => {
                this.setState({ applications: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    fetchApplicationsSpecific(id) {
        axios.get('http://localhost:80/api/Applications/' + id)
            .then(res => {
                this.setState({ applications: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }



    handleExpand() {
        this.setState({ isExpanded: !this.state.isExpanded })
    }

    render() {
        console.log(this.state)
        let accepted = 'Keine Bewerbungen angenommen'
        if (this.state.accepted.length > 0) accepted = (
            <Box margin={7}>
                <Typography component="h3">
                    Ihre bisher angenommenen Bewerbungen
            </Typography>
                <TableContainer>
                    <Table>
                        <TableHead style={{backgroundColor: "#C2C2C2"}}>
                            <TableRow>
                                <TableCell>Nutzername</TableCell>
                                <TableCell>Erfahung</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Lebenslauf</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.accepted.map((freelancer_info, index) => <AcceptedListItem key={index} info={freelancer_info} ></AcceptedListItem>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>)
        let applications = 'Keine neuen Bewerbungen'
        if (this.state.applications.length > 0) applications = (
            <Box margin={7} >
                <Typography component="h3">
                    Ihre bisher ausstehenden Bewerbungen
            </Typography>
                <TableContainer>
                    <Table>
                        <TableHead style={{backgroundColor: "#C2C2C2"}}>
                            <TableRow>
                                <TableCell>Nutzername</TableCell>
                                <TableCell>Erfahung</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Lebenslauf</TableCell>
                                <TableCell>Bewerbung annehmen</TableCell>
                                <TableCell>Bewerbung ablehnen</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.applications.map((app, index) => <ApplicationListItem key={index} info={app} token={this.state.token} onReject={this.props.onUpdate}></ApplicationListItem>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>)
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={this.handleExpand}>
                            {this.state.isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        {this.state.info.title}
                    </TableCell>
                    <TableCell>
                        {this.state.info.description}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                        <Collapse in={!this.state.isExpanded} timeout="auto" unmountOnExit>
                            {accepted}
                        </Collapse>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                        <Collapse in={!this.state.isExpanded} timeout="auto" unmountOnExit>
                            {applications}
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment >
        )
    }
    /*
    {this.state.applications.map((app, index) => <ApplicationListItem key={index} info={app} token={this.state.token} onReject={this.handleUpdate}></ApplicationListItem>)}
    */

    componentDidMount() {
        this.fetchApplications();
        this.fetchAccepted(this.state.info.role_id)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log("will receive")
        this.setState({ info: this.props.info })
        this.fetchApplicationsSpecific(nextProps.info.role_id)
        this.fetchAccepted(nextProps.info.role_id)
    }
}

export default ProjectRoleDetail;