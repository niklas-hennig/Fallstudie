import React, { Component } from 'react';
import axios from "axios";
import { Grid } from '@material-ui/core'

//Landing page imports
import Description from '../landing/description';
import Login from '../landing/login';
import PasswordReset from '../landing/PasswordReset';
import Registration from '../landing/registration';
import login_background from '../media/login_background.jpg';  //'./media/login_background.jpg';

//Complete Profile
import CompleteProfile from '../CompleProfile/completeProfile';

//Home-Screen imports
import LeftBar from '../homeScreen/leftBar';
import RightBar from '../homeScreen/rightBar';
import Carousel from '../homeScreen/carousel';

//Freelancer-Only pages
import RoleDetail from '../Freelancer/role_detail';

//Company-Only pages
import ProjectDetail from '../Company/project_detail';
import ProjectCreate from '../Company/project_create';

//Grid Layout
import { Card, CardHeader, CardContent, CardActions, TextField, MenuItem, Button, Typography, IconButton } from "@material-ui/core";

//Grip Layout - Switch
import Switch from '@material-ui/core/Switch';

class MainContent extends Component {
    constructor() {
        super();
        this.state = {
            Registration: false,
            login: false,             //Change to false, in develeopment to circumvent login (true)
            auth: null,
            content: null,
            leftContent: null,
            rightContent: null,
            settingsIsFreelancer: true,
            company_name: null,
            update: null,
            mainContent: null,
        }
        this.style = {
            position: 'fixed',
            top: '8%',
            left: '0%',
            height: '85%',
            width: '100%',
            display: "flex",
            overflowY: "scoll",
        }
        this.getBars = this.getBars.bind(this);
        this.handleApplied = this.handleApplied.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handlePasswordForgotten = this.handlePasswordForgotten.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleCompanyComplete = this.handleCompanyComplete.bind(this);
        this.handleSettingsComplete = this.handleSettingsComplete.bind(this);
        this.handleRoleSelected = this.handleRoleSelected.bind(this);
        this.handleProjectSelected = this.handleProjectSelected.bind(this);
        this.handleRoleApplicationSelected = this.handleRoleApplicationSelected.bind(this);
        this.handleBackToHome = this.handleBackToHome.bind(this);
        this.handleProjectCreate = this.handleProjectCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    componentDidMount() {
        if (window.localStorage.getItem("auth") === null) this.setState({ content: this.getLogin() });
        else {
            let auth = JSON.parse(window.localStorage.getItem("auth"))
            this.setState({ auth: auth })
            this.props.onLogin(auth)
            axios.get('http://localhost:80/api/Users/' + auth['username'] + '/' + auth['type'], auth)
                .then(data => {
                    let comp_id_new = data.data.comp_id
                    this.setState({ content: this.getHome(), comp_id: comp_id_new, company_name: data.data.company_name })
                    this.getBars()
                })
                .catch(err => console.log(err))
        }
    }

    handleApplied = (event) => {
        console.log("application handle")
        this.setState({ content: this.getHome() })
        this.getBars();
    }


    handleRegister = (event) => {
        this.setState({ content: this.getRegistration() });
    }
    handleBack = (event) => {
        this.setState({ content: this.getLogin() })
    }

    handleLogin = (event) => {
        this.setState({ auth: event })
        this.props.onLogin(event)
        axios.get('http://localhost:80/api/Users/' + this.state.auth['username'] + '/' + this.state.auth['type'], this.state.auth)
            .then(data => {
                if (data.data['is_set']) {
                    let comp_id_new = data.data.comp_id
                    this.setState({ content: this.getHome(), comp_id: comp_id_new, company_name: data.data.company_name })
                    this.getBars()
                    window.localStorage.setItem("auth", JSON.stringify(event))
                } else {
                    this.setState({ content: this.getSettings(), settingsIsFreelancer: true })
                }
            })
            .catch(err => console.log(err))
    }

    handlePasswordForgotten = (event) => {
        this.setState({ content: this.getPasswordReset() })
    }

    handleCompanyComplete = (event) => {
        this.setState({ company_name: event, settingsIsFreelancer: false })
        this.setState({ content: this.getSettings() })
    }

    handleSettingsComplete = (event) => {
        if (event!=="f") this.setState({ content: this.getLogin() })
        else {
            this.setState({ content: this.getHome() })
            this.getBars()
        }
    }

    handleRoleSelected(id, showApplication) {
        this.setState({ content: null })
        let cont = this.getRoleDetail(id, showApplication)
        this.getBars();
        this.setState({ content: cont })
    }

    handleProjectSelected(id) {
        this.getBars();
        this.setState({ content: this.getProjectDetail(id) })
    }

    handleUpdate() {
        this.setState({ update: new Date() })
        if (this.state.mainContent === "h") this.setState({ content: this.getHome() })
    }

    //not used
    handleRoleApplicationSelected(id) {
        console.log("selected application: " + id)
    }

    handleBackToHome() {
        this.getBars();
        this.setState({ content: this.getHome() })
    }

    handleProjectCreate() {
        this.getBars();
        this.setState({ content: this.getProjectCreation() })
    }



    getSettings(isChange) {
        let token = null
        let isFreelancer = null
        let username = null
        if (this.state.auth && isChange !== true) {
            token = this.state.auth['private']
            isFreelancer = true
        }
        else if (isChange !== true) isFreelancer = false
        else {
            token = this.state.auth['private']
            username = this.state.auth['username']
            console.log("settings with user:")
            console.log(username)
            if (this.state.auth['type'] === "f") isFreelancer = true
            else isFreelancer = false
        }

        this.setState({ mainContent: "s" })
        return <CompleteProfile username={username} onBack={this.handleBackToHome} isFreelancerSetting={isFreelancer} token={token} comp_name={this.state.company_name} userinfo={this.state.auth} isChange={isChange} onSubmit={this.handleSettingsComplete}></CompleteProfile>
    }

    getLogin() {
        let t = <div id='backgroundImage' style={{ backgroundImage: `url(${login_background})`, backgroundSize: "cover" }}>
        </div>
        return (
            <Grid container spacing={3} style={{ marginTop: '3%' }}>
                <Grid item xs={0}>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Description />
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Login onRegister={this.handleRegister} onLogin={this.handleLogin} onPasswordForgotten={this.handlePasswordForgotten} />
                </Grid>
            </Grid>
        )
    }

    getPasswordReset() {
        return <Grid container spacing={3} style={{ marginTop: '3%' }}>
            <Grid item xs={0}>
            </Grid>
            <Grid item xs={12} md={6}>
                <Description />
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={12} md={4}>
                <PasswordReset onBack={this.handleBack} />
            </Grid>
        </Grid>
    }

    getRegistration() {
        return <Grid container spacing={3} style={{ marginTop: '3%' }}>
            <Grid item xs={12} md={5}>
                <Description />
            </Grid>
            <Grid item xs={12} md={7}>
                <Registration onBack={this.handleBack} onCompanyComplete={this.handleCompanyComplete} />
            </Grid>
        </Grid>
    }

    getBars() {
        let username = this.state.auth['username']
        let type = this.state.auth['type']
        let auth = this.state.auth['private']
        let comp_id = this.state.comp_id
        this.setState({ update: new Date() })
        this.setState({ leftContent: <LeftBar username={username} type={type} token={auth} comp_id={comp_id} update={new Date()} onRoleSelect={this.handleRoleSelected} onProjectSelected={this.handleProjectSelected} /> })
        this.setState({ rightContent: <RightBar username={username} type={type} token={auth} comp_id={comp_id} update={new Date()} onApplicationSelect={this.handleRoleApplicationSelected} onChange={this.handleUpdate} /> })
    }

    getHome() {
        let username = this.state.auth['username']
        let type = this.state.auth['type']
        let auth = this.state.auth['private']
        let comp_id = this.state.comp_id
        this.setState({ mainContent: "h" })
        return <div>
            <Carousel username={username} type={type} token={auth} comp_id={comp_id} update={this.state.update} onRoleSelect={this.handleRoleSelected} onProjectSelected={this.handleProjectSelected} onProjectCreate={this.handleProjectCreate} />
        </div>
    }

    getRoleDetail(role_id, showApplication) {
        console.log("showing role" + role_id)
        let username = this.state.auth['username']
        let auth = this.state.auth['private']
        this.setState({ mainContent: "rd" })
        return <div>
            <RoleDetail role_id={role_id} username={username} token={auth} showApplication={showApplication} onBack={this.handleBackToHome} onApply={this.handleApplied}></RoleDetail>
        </div>
    }

    getProjectDetail(project_id) {
        let username = this.state.auth['username']
        let auth = this.state.auth['private']
        this.setState({ mainContent: "pd" })
        return <div>
            <ProjectDetail project_id={project_id} token={auth} username={username} onBack={this.handleBackToHome} onUpdate={this.getBars}></ProjectDetail>
        </div>
    }

    getProjectCreation() {
        let username = this.state.auth['username']
        let auth = this.state.auth['private']
        let comp_id = this.state.comp_id
        this.setState({ mainContent: "pc" })
        return <div>
            <ProjectCreate username={username} token={auth} comp_id={comp_id} onBack={this.handleBackToHome}></ProjectCreate>
        </div>
    }

    render() {
        let lftcon = this.state.leftContent
        let cont = this.state.content
        let rghcon = this.state.rightContent
        let barCols = 0

        if (lftcon) barCols = 2
        return (
            <React.Fragment>
                <Grid item xs={12} md={barCols} alignContent="stretch">
                    {lftcon}
                </Grid>
                <Grid md={1}></Grid>
                <Grid item xs={12} md={12 - (2 * barCols) - 2} alignContent="flex-start" >
                    {cont}
                </Grid>
                <Grid md={1}></Grid>
                <Grid item xs={12} md={barCols} alignContent="stretch">
                    {rghcon}
                </Grid>
            </React.Fragment>
        )
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.goToSettings === true && this.state.mainContent !== "s") this.setState({ content: this.getSettings(true), leftContent: '', rightContent: '' })
    }
}
export default MainContent;