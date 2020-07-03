import React, { Component } from 'react';
import axios from 'axios';
import { Paper, Card, CardHeader, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BackspaceIcon from '@material-ui/icons/Backspace';
import moment from 'moment'

class RoleDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role_id: this.props.role_id,
            token: this.props.token,
            username: this.props.username,
            info: null,
            showApplication: this.props.showApplication
        }
        this.handleBack = this.handleBack.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.fetchInfo = this.fetchInfo.bind(this);
    }

    //Fill state with data to display
    fetchInfo(role_id) {
        axios.get('http://localhost:80/api/Roles/Freelancer/All/' + role_id + '/' + this.state.token)
            .then(res => {
                this.setState({ info: res.data })
            })
            .catch(err => console.error(err))
    }

    handleBack = (event) => {
        this.props.onBack()
    }

    //Call Backend to post application for the selected role
    handleApply = (event) => {
        axios.post('http://localhost:80/api/Applications/' + this.state.role_id + '/' + this.state.username + '/' + this.state.token)
            .then(res => this.props.onApply())
            .catch(err => console.error(err))

    }


    //Preformat information and show application button when the call doesn't come from the leftbar
    render() {
        let project_title = ''
        let start_date = ''
        let end_date = ''
        let bewerbungsfrist = ''
        let role_title = ''
        let role_description = ''
        let payment = ''
        let requirements = ''
        if (this.state.info) {
            project_title = this.state.info.titel
            start_date = moment(this.state.info.start_date).format('DD.MM.YYYY')
            end_date = moment(this.state.info.end_date).format('DD.MM.YYYY')
            bewerbungsfrist = moment(this.state.info.application_limit).format('DD.MM.YYYY')
            role_title = this.state.info.title
            role_description = this.state.info.description
            payment = this.state.info.payment
            requirements = this.state.requirements
        }
        let applyBtn = ''
        if (!this.state.showApplication === false) applyBtn = <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowForwardIosIcon />}
            onClick={this.handleApply}
        >
            Jetzt bewerben
        </Button>

        return <React.Fragment>
            <Card
                variant="elevation"
                style={{ marginTop: "5%" }}
            >
                <CardHeader title={"Projekttitel: "+project_title}></CardHeader>
            <CardContent>
                <Typography>
                    <p>Start: {start_date}</p>
                    <p>Ende: {end_date}</p>
                    <p>Bewerbungsfrist: {bewerbungsfrist}</p>
                </Typography>
            </CardContent>
            </Card>
            <Card
                variant="outlined"
                style={{ marginTop: "3%" }}
            >
                <CardHeader
                    title={"Rollentitel: " + role_title}>
                </CardHeader>
                <CardContent>
                    <Typography variant="body2" component="p">
                        Beschreibung: {role_description}
                    </Typography>
                    <Typography variant="caption" component="p">
                        Vorraussetzungen: {requirements}
                    </Typography>
                    <Typography variant="caption" component="p">
                        Bezahlung: {payment}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<BackspaceIcon />}
                        onClick={this.handleBack}
                    >
                        Zurück
                    </Button>
                    {applyBtn}
                </CardActions>
            </Card>
        </React.Fragment >
    }

    componentDidMount() {
        this.fetchInfo(this.state.role_id)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.role_id !== nextProps.role_id)
            this.fetchInfo(nextProps.role_id)
        this.setState({ role_id: nextProps.role_id })
    }
}

export default RoleDetail;