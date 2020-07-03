import React, { Component } from "react";
import mailIcon from '../media/mailIcon.png';
import passwordIcon from '../media/passwordIcon.png';
import companyIcon from '../media/companyIcon.png';
import axios from 'axios';
import { TextField, Grid, Button, Icon } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            username: '',
            password: '',
            company: '',
            type: 'f'
        }

        this.iconStyle = {
            position: 'relative',
            top: '10px',
            height: '35px'
        }
        this.setState({ type: props.isCompany })
        this.submitHandlerLogin = this.submitHandlerLogin.bind(this);

    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitHandlerLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:80/api/Authentifications', {
            username: this.state.username,
            password: this.state.password,
            type: this.state.type
        })
            .then((res) => {
                this.props.onLoginChange(res.data);
            })
            .catch((err) => {
                console.log(err)
                this.setState({ isError: true })
            })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let newtype = '';
        if (nextProps.isCompany) newtype = 'c'
        else newtype = 'f'
        if (newtype !== this.state.type) {
            this.setState({ type: newtype });
        }
    }

    render() {
        let inputCompanyName = '';
        let error = '';
        if (this.props.isCompany) {
            inputCompanyName = <Grid item container alignItems="flex-end">
                <Grid item xs={2}>
                    <BusinessIcon color='Primary' fontSize='large' />
                </Grid>
                <Grid item xs={10}>
                    <TextField label="Firmenname" fullWidth="true" variant="outlined" name="Company_name" onChange={this.changeHandler} />
                </Grid>
            </Grid>
        }
        if (this.state.isError) {
            error = <div id='error' style={{ color: 'red', position: 'relative', 'top': '10%' }}>
                <p>Falscher Nutzername oder Passwort</p>
            </div>
        }
        return (<React.Fragment>
            <form onSubmit={this.submitHandlerLogin}>
                <Grid container spacing={2}>
                    <Grid item container xs={10} direction="column">
                        {inputCompanyName}
                        <Grid item container alignItems="flex-end" style={{marginTop: "3%", marginBottom: "3%"}}>
                            <Grid item xs={2}>
                                <PersonIcon color='Primary' fontSize='large' />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField fullWidth="true" id="input-with-icon-grid" label="Benutzername" name="username" variant="outlined" onChange={this.changeHandler} />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={2}>
                                <LockOpenIcon color='Primary' fontSize='large' />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField id="input-with-icon-grid" fullWidth="true" type="password" label="Passwort" name="password" variant="outlined" onChange={this.changeHandler} />
                            </Grid>
                            <Grid item xs={12} align="right">
                                <a href="#!" style={{ fontSize: "9px", textDecoration: "none" }} onClick={this.props.onPasswordReset}>
                                    Passwort vergessen
                        </a>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item md={6} align="left">
                        <Button id="button_register"
                            onClick={this.props.onRegister}
                            variant="outlined">
                            Registrieren
                            </Button>
                    </Grid>
                    <Grid item md={6} align="right">
                        <Button id="button_login" type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={<ExitToAppIcon />}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {error}
        </React.Fragment>
        )
    }
}

export default LoginForm;