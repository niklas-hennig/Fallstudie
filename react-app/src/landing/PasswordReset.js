import React, { Component } from "react";
import axios from 'axios';
import { Card, CardHeader, CardContent, CardActions, Button, Typography, TextField, MenuItem, Paper } from "@material-ui/core";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

class PasswordReset extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            type: "f",

            token: "",
            password: "",
            isRequest: true
        }
        this.handleReqest = this.handleReqest.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    handleReqest = (event) => {
        event.preventDefault();
        axios.post('http://localhost:80/api/User/Password/' + this.state.username + '/' + this.state.type)
            .then(res => {
                this.setState({ isRequest: false })
            })
            .catch(err => console.error(err))

    }

    handleReset = (event) => {
        event.preventDefault();
        axios.put('http://localhost:80/api/User/Password/' + this.state.username + '/' + this.state.type + '/' + this.state.token + '/' + this.state.password)
            .then(res => this.props.onBack())
            .catch(err => console.error(err))
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        let form = ''
        if (this.state.isRequest) {
            form = <form onSubmit={this.handleReqest}>
                <Card>
                    <CardHeader
                        title="Passwort zurücksetzen"
                        action={<Button onClick={this.props.onBack}>Zurück</Button>}
                    />
                    <CardContent>
                        <Paper style={{ padding: "4%" }}>
                            <Typography>Bitte Nutzernamen eingeben</Typography>
                            <TextField required name="username" label="Nutzername" value={this.state.username} onChange={this.changeHandler} />
                            <Typography style={{marginTop: "5%"}}>Bitte wählen Sie Ihren Kontotyp aus</Typography>
                            <TextField name="type" select value={this.state.type} onChange={this.changeHandler}>
                                <MenuItem value="f">Freelancer</MenuItem>
                                <MenuItem value="c">Unternehmen</MenuItem>
                            </TextField>
                        </Paper>
                    </CardContent>
                    <CardActions style={{ float: "right" }}>
                        <Button type="submit" variant="contained" color="primary" endIcon={<RotateLeftIcon />}>Anfrage senden</Button>
                    </CardActions>
                </Card>
            </form>
        }
        else {
            form = <form onSubmit={this.handleReset}>
                <Card>
                    <CardHeader
                        title="Passwort zurücksetzen"
                        action={<Button onClick={this.props.onBack}>Zurück</Button>}
                    />
                    <CardContent>
                        <Paper style={{ padding: "4%" }}>
                            <Typography>Bitte Nutzernamen eingeben</Typography>
                            <TextField required fullWidth name="username" label="Nutzername" value={this.state.username} onChange={this.changeHandler} />
                            <TextField required fullWidth type="number" name="token" label="Bitte Token eingeben" value={this.state.token} onChange={this.changeHandler} style={{marginTop: "5%"}}/>
                            <TextField required fullWidth type="password" name="password" label="Bitte neues Passwort eingeben" value={this.state.password} onChange={this.changeHandler} style={{marginTop: "5%"}}/>
                        </Paper>
                    </CardContent>
                    <CardActions style={{ float: "right" }}>
                        <Button type="submit" variant="contained" color="primary" endIcon={<RotateLeftIcon />}>Passwort zurücksetzen</Button>
                    </CardActions>
                </Card>
            </form >
        }
        return <div style={this.styleDefault}>
            {form}
        </div>
    }
}
export default PasswordReset;