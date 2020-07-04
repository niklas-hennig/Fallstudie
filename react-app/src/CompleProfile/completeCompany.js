import React, { Component } from "react";
import axios from "axios";
import { Grid, Card, CardContent, CardHeader, CardActions, Button, Typography, TextField, Checkbox, FormControlLabel, MenuItem, IconButton } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import BackspaceIcon from '@material-ui/icons/Backspace';

class CompleteProfileCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comp_id: this.props.comp_id,
            comp_name: this.props.comp_name,
            street: this.props.street,
            number: this.props.number,
            postcode: this.props.postcode,
            city: this.props.city,
            country: this.props.country,
            tel_no: this.props.tel_no,
            street_bill: this.props.street_bill,
            number_bill: this.props.number_bill,
            postcode_bill: this.props.postcode_bill,
            city_bill: this.props.city_bill,
            description: this.props.description,
            is_set: "true",
            //User Info
            name: null,
            surname: null,
            username: this.props.username,
            email: null,
            gender: 'f',
            password: null,
            password_check: null,

            //Functional states
            enable_billing: true,
            mailError: false,
            passwordError: false,
            isChange: this.props.isChange
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.billingHandler = this.billingHandler.bind(this);
    }


    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    billingHandler = (event) => {
        if (this.state.enable_billing) {
            this.setState({ enable_billing: false, street_bill: this.state.street, number_bill: this.state.number, postcode_bill: this.state.postcode, city_bill: this.state.city })
        }
        else this.setState({ enable_billing: true })
    }


    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.password != this.state.password_check) {
            this.setState({ passwordError: true, mailError: false })
            return
        } else if (!this.state.email.includes('@')) {
            this.setState({ mailError: true, passwordError: false })
            return
        } else {
            axios.put('http://localhost:80/api/Companies/' + this.state.comp_name, {
                tel_no: this.state.tel_no,
                street: this.state.street,
                number: this.state.number,
                postcode: this.state.postcode,
                city: this.state.city,
                country: this.state.country,
                tel_no: this.state.tel_no,
                street_bill: this.state.street_bill,
                number_bill: this.state.number_bill,
                postcode_bill: this.state.postcode_bill,
                city_bill: this.state.city_bill,
                description: this.state.description,
            }).then(res => {
                if (this.state.isChange !== true) {
                    axios.post('http://localhost/api/Users/CompanyUser', {
                        name: this.state.name,
                        surname: this.state.surname,
                        username: this.state.username,
                        email: this.state.email,
                        gender: this.state.gender,
                        password: this.state.password,
                        company_name: this.state.comp_name
                    })
                        .then(res => {
                            this.props.onSubmit('c');
                        })
                        .catch(err => console.error(err))
                } else {
                    axios.put('http://localhost/api/Users/CompanyUser', {
                        name: this.state.name,
                        surname: this.state.surname,
                        username: this.state.username,
                        email: this.state.email,
                        gender: this.state.gender,
                        password: this.state.password
                    })
                        .then(res => {
                            this.props.onBack();
                        })
                        .catch(err => console.error(err))
                }
            })
                .catch(err => console.error(err))
        }

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            comp_id: nextProps.comp_id,
            comp_name: nextProps.name,
            street: nextProps.street,
            number: nextProps.number,
            postcode: nextProps.postcode,
            city: nextProps.city,
            country: nextProps.country,
            description: nextProps.description,
            tel_no: nextProps.tel_no
        })
        if (this.props.street_bill) this.setState({ enable_billing: false })
    }

    render() {
        let billing = ''
        let mailError = ''
        let passwordError = ''
        let disableComponent = true
        let backAction = ''
        if (!this.state.isChange) {
            disableComponent = false
        }else{
            backAction = <IconButton aria-label="Zurück"
                onClick={this.props.onBack}
            >
                <BackspaceIcon />
            </IconButton>
        }

        if (!this.state.enable_billing) billing =
            <React.Fragment>
                <TextField type="text" name="bill_street" helperText="Straße" defaultValue={this.state.street_bill} onChange={this.changeHandler} />
                <TextField type="number" name="bill_number" helperText="Hausnummer" defaultValue={this.state.number_bill} onChange={this.changeHandler} /><br />
                <TextField  name="bill_postcode" helperText="Postleitzahl" defaultValue={this.state.postcode_bill} onChange={this.changeHandler} />
                <TextField type="text" name="bill_city" helperText="Stadt" defaultValue={this.state.city_bill} onChange={this.changeHandler} />
            </React.Fragment>
        if (this.state.passwordError) {
            passwordError = <p style={{ color: 'red', position: 'relative', 'top': '10%' }}>Passwörter stimmen nicht überein</p>
        }

        if (this.state.mailError) {
            mailError = <p style={{ color: 'red', position: 'relative', 'top': '10%' }}>Keine gültige Mailaddresse</p>
        }
        return (
            <form id="completeCompany" onSubmit={this.submitHandler}>
                <Card>
                    <CardHeader
                        title={"Willkommen " + this.state.comp_name + ", vervollständige doch dein Profil um gefunden zu werden"}
                        component="h2"
                        action={
                            backAction
                        }
                    />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card>
                                    <CardHeader
                                        title="Adresse"
                                    />
                                    <CardContent style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        justifyContent: "space-evenly"
                                    }}>
                                        <Typography variant="subtitle1">
                                            Lieferadresse
                                        </Typography>
                                        <TextField name="street" required helperText="Straße" value={this.state.street} onChange={this.changeHandler} />
                                        <TextField name="number" type="number" required helperText="Hausnummer" value={this.state.number} onChange={this.changeHandler} />
                                        <TextField name="postcode" required helperText="Postleitzahl" value={this.state.postcode} onChange={this.changeHandler} />
                                        <TextField name="city" required helperText="Stadt" value={this.state.city} onChange={this.changeHandler} />
                                        <TextField name="country" required helperText="Land" value={this.state.country} onChange={this.changeHandler} />
                                        <TextField name="tel_no" type="number" required helperText="Telefonnummer" value={this.state.tel_no} onChange={this.changeHandler} />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={!this.state.enable_billing}
                                                    onChange={this.billingHandler}
                                                    name="enable_billing"
                                                    color="primary"
                                                />
                                            }
                                            label="Zahlungsaddresse abweichend zu Lieferadresse"
                                        />
                                        {billing}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card>
                                    <CardHeader title="Firmendetails" />
                                    <CardContent>
                                        <div id="details"><br />
                                            <TextField multiline fullWidth rows={10} variant="outlined" name="description" label="Beschreibung" defaultValue={this.state.description} /><br />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardHeader title="Ihr Account" />
                                    <CardContent>
                                        <TextField name="name" required helperText="Nachname" value={this.state.name} onChange={this.changeHandler} />
                                        <TextField name="surname" required helperText="Vorname" value={this.state.surname} onChange={this.changeHandler} />
                                        <TextField select required name="gender" value={this.state.gender} onChange={this.changeHandler}>
                                            <MenuItem value="f">Weiblich</MenuItem>
                                            <MenuItem value="m">Männlich</MenuItem>
                                            <MenuItem value="d">Divers</MenuItem>
                                        </TextField><br />

                                        <TextField name="username" disabled={disableComponent} helperText="Nutername" value={this.state.username} onChange={this.changeHandler} />
                                        <TextField name="email" required helperText="E-Mail" value={this.state.email} onChange={this.changeHandler} />
                                        <br />
                                        <TextField type="password" name="password" helperText="Passwort" onChange={this.changeHandler} />
                                        <TextField type="password" name="password_check" helperText="Passwort erneut eingeben" onChange={this.changeHandler} />
                                        {mailError}
                                        {passwordError}
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            startIcon={<ArrowForwardIcon />}

                                        >
                                            Speichern
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        );
    }

    componentDidMount() {
        if (this.props.street_bill) this.setState({ enable_billing: false })
        axios.get('http://localhost:80/api/Users/' + this.state.username + '/c/')
            .then(data => {
                this.setState({
                    name: data.data.name,
                    surname: data.data.surname,
                    email: data.data.email,
                    gender: data.data.gender
                })
            })
            .catch(err => console.log(err))
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.state.comp_name!==nextProps.comp_name){
            this.setState({comp_id: nextProps.comp_id,
                comp_name: nextProps.comp_name,
                street: nextProps.street,
                number: nextProps.number,
                postcode: nextProps.postcode,
                city: nextProps.city,
                country: nextProps.country,
                tel_no: nextProps.tel_no,
                street_bill: nextProps.street_bill,
                number_bill: nextProps.number_bill,
                postcode_bill: nextProps.postcode_bill,
                city_bill: nextProps.city_bill,
                description: nextProps.description,})
        }
    }
}

export default CompleteProfileCompany;