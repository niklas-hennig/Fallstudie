import React, { Component } from "react";
import LoginForm from './loginForm';
import Switch from '@material-ui/core/Switch';
//Grid Layout
import { Card, CardHeader, CardContent, Grid, TextField, MenuItem, Button, Typography, IconButton, CardActions } from "@material-ui/core";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompany: false,
            isLogin: false,
            loginSwitch: true,
            subHeaderText: "Finde jetzt dein perfektes Projekt"
        }

        this.bottomStyle = {
            position: 'relative',
            top: '15%',
            left: '30%',
            width: '100%',
            display: "flex",
            flexDirection: "row"
        }

        this.resetStyle = {
            position: 'relative',
            top: '15%'
        }
        this.styleDefault = {
            marginRight: "5%",
            backgroundColor: "#D9D9D9",
            position: "absolute",
            width: "40%",
            height: '60%',
            textAlign: "center",
            left: '55%',
            top: '10%',
            borderRadius: '200px'
        }
        this.handlePasswordForgotten = this.handlePasswordForgotten.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }
    switchToCompany = () => {
        this.setState({ isCompany: true });
    }
    switchToFreelancer = () => {
        this.setState({ isCompany: false });
    }

    submitHandlerRegister = (event) => {
        this.props.onRegister(true);
    }
    handleLogin = (event) => {
        this.setState({ isLogin: true })
        this.props.onLogin(event);
    }
    handlePasswordForgotten() {
        this.props.onPasswordForgotten();
    }

    handleToggleSwitch() {
        if (this.state.loginSwitch) {
            this.setState({ subHeaderText: "Stelle deine Projekte online"})
            this.setState({ loginSwitch: false })

        } else {
            this.setState({ subHeaderText: "Finde jetzt dein perfektes Projekt"})
            this.setState({ loginSwitch: true })

        }
    }


    render() {
        let style = this.styleDefault;
        return (
            <Card alignContent="center" textAlign="center" justifyItems="center">
                <CardHeader
                    title="Login"
                    subheader={this.state.subHeaderText}
                />
                <CardContent style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyItems: "space-evenly"
                }}>
                    <Typography component="div">
                        <Card id="CardLogin" style={{backgroundColor: "white"}}>
                            <CardHeader action={<Grid component="label" container spacing={1}>
                                    <Grid item>Unternehmen</Grid>
                                    <Grid item>
                                        <Switch id="switchLogin" color='primary'
                                            checked={this.state.loginSwitch}
                                            onChange={e => this.handleToggleSwitch()}
                                        />
                                    </Grid>
                                    <Grid item>Freelancer</Grid>
                                </Grid>}
                                />
                            <CardContent>
                                <LoginForm isCompany={!this.state.loginSwitch} onLoginChange={this.handleLogin} onPasswordReset={this.handlePasswordForgotten} onRegister={this.submitHandlerRegister}/>
                            </CardContent>
                        </Card>
                    </Typography>

                </CardContent>
            </Card>

        )
    }
}

export default Login;