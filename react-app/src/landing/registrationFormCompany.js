import React, { Component } from "react";
import axios from "axios";
import { TextField, Card, MenuItem, Grid, Button } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class RegistrationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            continue: false,
            registration: false,
            name: 'testcompany',
            street: '',
            number: '',
            postcode: '',
            city: '',
            country: 'Deutschland'
        }
        this.divStyle = {
            position: 'relative',
            top: '50%'
        }
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.registration === true) {
            axios.post('http://localhost/api/Company', {
                name: this.state.name,
                street: this.state.street,
                number: this.state.number,
                postcode: this.state.postcode,
                city: this.state.city,
                country: this.state.country
            })
                .then((res) => {
                    console.log("respone")
                    console.log(res.data)
                    this.props.onRegistered(res.data);
                })
                .catch((err) => {
                    console.log('Error in company submit')
                    console.error(err)
                })
        } else {
            this.searchHandler(event);
        }
    }

    searchHandler = (event) => {
        event.preventDefault();
        axios.get('http://localhost/api/Company/Existence/' + this.state.name)
            .then((res) => {
                if (res.data) {
                    this.props.onRegistered(res.data.name);
                } else {
                    this.setState({ registration: true })
                }
            })
            .catch((err) => {
                console.log('Error in company search')
                console.error(err)
            })
    }

    render() {

        let registeredBtn = 'Suchen'
        let registered = ''
        let fullForm = ''
        if (this.state.registration) {
            registeredBtn = 'Registrieren'
            registered =
                <div>
                    <p>Registrierung erfolgreich</p>
                </div>
            fullForm =
                <React.Fragment>
                    <Grid item xs={9}>
                        <TextField fullWidth="true" required label="Straße" name="street" onChange={this.changeHandler} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth="true" required label="Nummer" name="number" onChange={this.changeHandler} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth="true" required label="PLZ" name="postcode" onChange={this.changeHandler} />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField fullWidth="true" required label="Ort" name="city" onChange={this.changeHandler} />
                    </Grid>
                    <Grid item={12}>
                        <TextField fullWidth={true} required select name="country" helperText="Land" onChange={this.changeHandler}>
                            <MenuItem value="Deutschland">Deutschland</MenuItem>

                        </TextField>
                    </Grid>
                </React.Fragment>
        }

        return <div id="RegistrationForm" style={{ width: '60%', left: '20%', top: '15%', position: 'relative' }}>
            <form onSubmit={this.submitHandler} style={{ position: 'relative', top: '20%' }}>

                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth="true" label="Firmenname" name="name" value={this.state.name} onChange={this.changeHandler} />
                    </Grid>
                    {fullForm}
                    <Grid item xs={12} align='right'>
                        <Button type="submit" id="search_company" variant="contained" color="primary" endIcon={<ExitToAppIcon />}>{registeredBtn}</Button>
                    </Grid>
                </Grid>

            </form>

        </div>
    }
}

export default RegistrationForm;