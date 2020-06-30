import React, { Component } from "react";
import axios from "axios";
import { Card, Grid, CardHeader, CardContent, CardActions, TextField, MenuItem, Button, Typography, IconButton } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import BackspaceIcon from '@material-ui/icons/Backspace';
import moment from 'moment'

class CompleteProfileFreelancer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            email: this.props.email,
            name: this.props.name,
            surname: this.props.surname,
            gender: this.props.gender,
            date_of_birth: this.props.date_of_birth,
            street: this.props.street,
            number: this.props.number,
            postcode: this.props.postcode,
            city: this.props.city,
            country: this.props.country,
            resume_link: null,
            iban: this.props.iban,
            ktn_owner: this.props.ktn_owner,
            experience: this.props.experience,
            is_set: "true",
            prefences_available: [],
            prefence: null,
            datei: null,
            token: this.props.token,
            isChange: this.props.isChange,

            showUploadBtn: false
        }
        this.inputStyle = {
            margin: "1%",
        }
        this.uploadHandler = this.uploadHandler.bind(this);
    }
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    fileHandler = event => {
        console.log(event.target.files[0])
        this.setState({ showUploadBtn: true })
        this.setState({ datei: event.target.files[0] })
    }

    uploadHandler = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('file', this.state.datei)
        axios.post('http://localhost:80/api/File/' + this.state.username + '/' + this.state.token, data, {

        }).then(res => {
            console.log(res)
            this.setState({ showUploadBtn: false })
        })
            .catch(err => console.log(err))
    }

    fetchPrefences() {
        let pref = []
        let key = ''
        axios.get('http://localhost:80/api/Prefence/')
            .then(res => {
                for (key in res.data) {
                    pref.push(res.data[key]['pref_name'])
                }
                this.setState({ prefences_available: pref, prefence: pref[0] })

            })
    }

    submitHandler = (event) => {
        event.preventDefault();

        console.log(this.state)
        axios.put('http://localhost:80/api/User/Freelancer', {
            username: this.props.username,
            date_of_birth: this.state.date_of_birth,
            street: this.state.street,
            number: this.state.number,
            postcode: this.state.postcode,
            city: this.state.city,
            country: this.state.country,
            resume_link: this.state.resume_link,
            iban: this.state.iban,
            ktn_owner: this.state.ktn_owner,
            experience: this.state.experience,
            is_set: this.state.is_set
        }).then(res => {
            axios.put('http://localhost:80/api/Prefence/' + this.state.username, {
                prefence: this.state.prefence
            }).then(res => {
                if (this.state.isChange) this.props.onBack();
                else this.props.onSubmit('f')
            }
            )
                .catch(err => console.error(err))

        })
    }

    UNSAFE_componentWillMount() {
        this.fetchPrefences()
    }

    render() {
        let anrede = "Lieber"
        if (this.props.gender === 'f') {
            anrede = 'Liebe'
        } if (this.props.gender === 'd') {
            anrede = 'Hallo'
        }
        let disableComponent = true
        let backAction = ''
        if (this.state.isChange) {
            disableComponent = false
            backAction = <IconButton aria-label="Zurück"
                onClick={this.props.onBack}
            >
                <BackspaceIcon />
            </IconButton>
        }
        let uploadBtn = ''
        if (this.state.showUploadBtn === true) uploadBtn = <Button variant="contained" color="primary" onClick={this.uploadHandler}>Hochladen</Button>
        let date = ''
        if (this.state.date_of_birth) date = moment(this.state.date_of_birth).format('YYYY-MM-DD')
        let activityText = 'vervollständige'
        if (this.state.isChange) activityText = 'ergänze'
        return (
            <form onSubmit={this.submitHandler}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title={anrede + ' ' + this.props.surname + ' ' + this.props.name + ', ' + activityText + ' dein Profil'}
                                action={
                                    backAction
                                }
                            >
                            </CardHeader>
                            <CardContent style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyItems: "space-evenly"
                            }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Card style={{backgroundColor: "white"}}>
                                            <CardHeader title="Persönliche Daten" />
                                            <CardContent>
                                                <TextField style={this.inputStyle} helperText="Nachname" disabled={disableComponent} name="name" placeholder={this.props.name} onChange={this.changeHandler} />
                                                <TextField style={this.inputStyle} helperText="Vorname" disabled={disableComponent} name="surname" placeholder={this.props.surname} onChange={this.changeHandler} />
                                                <TextField
                                                    required
                                                    style={this.inputStyle}
                                                    label="Geburtstag"
                                                    type="date"
                                                    value={date}
                                                    format='YYYY-MM-DD'
                                                    name="date_of_birth"
                                                    onChange={this.changeHandler}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Card style={{backgroundColor: "white"}}>
                                            <CardHeader title="Bevorzugtes Interessensgebiet" />
                                            <CardContent>
                                                <TextField select required name="prefence" value={this.state.prefence} helperText="Wählen Sie eine Kategorie für die Sie sich interessieren" onChange={this.changeHandler}>
                                                    {this.state.prefences_available.map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                                                </TextField>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions style={{
                                float: "right",
                                alignSelf: "end",
                            }}>
                                <Button
                                    variant="conained"
                                    type="submit"
                                    color="primary"
                                    startIcon={<ArrowForwardIcon />}

                                >
                                    Speichern
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            style={{ marginTop: "2%" }}
                        >
                            <CardHeader
                                title="Addresse und Zahlungsdaten"
                            >
                            </CardHeader>
                            <CardContent>
                                <TextField required style={this.inputStyle} helperText="Straße *" name="street" value={this.props.street} onChange={this.changeHandler} />
                                <TextField required type="number" style={this.inputStyle} helperText="Hausnummer  *" name="number" value={this.props.number} onChange={this.changeHandler} />
                                <br />
                                <TextField required style={this.inputStyle} helperText="Postleitzahl *" name="postcode" value={this.props.postcode} onChange={this.changeHandler} />
                                <TextField required style={this.inputStyle} helperText="Stadt *" name="city" value={this.props.city} onChange={this.changeHandler} />
                                <TextField style={this.inputStyle} helperText="Land *" name="country" value={this.props.country} onChange={this.changeHandler} />
                                <br />
                                <TextField style={this.inputStyle} helperText="IBAN" name="iban" value={this.props.iban} onChange={this.changeHandler} />
                                <TextField style={this.inputStyle} helperText="Kontoinhaber" name="ktn_owner" value={this.props.ktn_owner} onChange={this.changeHandler} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            style={{ marginTop: "2%" }}
                        >
                            <CardHeader
                                title="Qualifikationen" />
                            <CardContent>
                                <input
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    type="file"
                                    onChange={this.fileHandler}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" component="span">
                                        Datei auswählen
                                    </Button>
                                </label>
                                {uploadBtn}
                                <br />
                                <Typography variant="caption">
                                    Laden Sie ihren Lebenslauf hier hoch
                                </Typography>
                                <br />
                                <br />
                                <TextField multiline rows={5} fullWidth variant="outlined" name="experience" value={this.state.experience} label="Sonstige Qualifikationen" onChange={this.changeHandler} defaultValue={this.state.experience} />
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid >
            </form>
        );
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            username: nextProps.username,
            email: nextProps.email,
            name: nextProps.name,
            surname: nextProps.surname,
            gender: nextProps.gender,
            date_of_birth: nextProps.date_of_birth,
            street: nextProps.street,
            number: nextProps.number,
            postcode: nextProps.postcode,
            city: nextProps.city,
            country: nextProps.country,
            //resume_link: null,
            iban: nextProps.iban,
            ktn_owner: nextProps.ktn_owner,
            experience: nextProps.experience
        })
    }
}


export default CompleteProfileFreelancer;