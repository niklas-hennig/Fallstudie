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
        axios.post('http://localhost:80/api/Authentification', {
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
        let margin = '20%';
        if (this.props.isCompany) {
            margin = '15%';
            inputCompanyName = <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <BusinessIcon color='Primary' fontSize='large' />
                </Grid>
                <Grid item>
                    <TextField id="input-with-icon-grid" label="Firmenname" variant="outlined" name="Company_name" onChange={this.changeHandler} />
                </Grid>
            </Grid>
        }
        if (this.state.isError) {
            error = <div id='error' style={{ color: 'red', position: 'relative', 'top': '10%' }}>
                <p>Falscher Nutzername oder Passwort</p>
            </div>
        }
        return <div id='loginForm' style={{ position: 'relative', top: margin }}>
            <form onSubmit={this.submitHandlerLogin} style={{ position: 'relative', top: '20%' }}>
                {inputCompanyName}

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <PersonIcon color='Primary' fontSize='large' />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Benutzername" name="username" variant="outlined" onChange={this.changeHandler} />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <LockOpenIcon color='Primary' fontSize='large' />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Passwort" name="password" variant="outlined" onChange={this.changeHandler} />
                    </Grid>
                </Grid>

                <Button id="button_login" type="submit" id="button_login" 
                    variant="contained"
                    color="primary"
                    endIcon={<ExitToAppIcon />}
                >
                    Login
                </Button>
            </form>
            {error}
        </div>
    }
}

export default LoginForm;