import React, { Component } from "react";
import { Card, CardHeader, CardContent, Typography, Grid, CardActions, Button } from '@material-ui/core'
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Description extends Component {
    constructor() {
        super()
        this.style = {
            marginLeft: '2.5%',
            marginTop: '2.5%',
            backgroundColor: "#D9D9D9",
            borderRadius: '50px',
            textAlign: 'justify',
            float: 'left'
        }
        this.handleOpenAbout = this.handleOpenAbout.bind(this);
    }

    handleOpenAbout() {
        window.open("/about.html", '_self')
    }


    render() {
        return (<React.Fragment>
            <Card
                variant="outlined"
            >
                <CardHeader title="Herzlich Willkommen bei Freelane">
                </CardHeader>
                <CardContent>
                    <Typography component="h3" variant="subtitle1" style={{ marginTop: "2%" }}>Unternehmen?</Typography>
                    <Typography variant="caption">
                        Sind Sie ein Unternehmen, das qualifizierte Freelancer für Ihre Projekte sucht? Möchten Sie Ihren Bewerbungsprozess
                        digitalisieren und gleichzeitig schlanker gestalten? Dann sind Sie bei uns richtig. Wir bieten Ihnen beliebig
                        viele Konten für Ihr Unternehmen und eine Auswahl der eingegangen Bewerbungen.
                        Das alles ist schon mit einer einmaligen Dateneingabe möglich.
                        </Typography>
                        <br />
                    <Typography component="h3" variant="subtitle1">Freelancer?</Typography>
                    <Typography variant="caption">
                        Sind Sie Freelancer und auf der Suche nach neuen, spannenden Projekten? Bestenfalls sogar Projekte, die auf
                        Ihre persönlichen Bedürfnisse zugesschnitten sind? Dann ist Freelane der richtige Ort für Sie. Wir bieten
                        Ihnen nach einer kurzen Registrierung schon eine Auswahl an Projekten, auf die Sie sich mit nur einem
                            Klick bewerben können.<br />
                    </Typography>
                    <Grid container spacing={5} style={{ marginTop: "3%" }} >

                        <Grid item xs={3} align="center">
                            <AssignmentIcon fontSize="large" color="primary" />
                            <Typography align="center">Registrieren</Typography>
                        </Grid>
                        <Grid item xs={1} align="center">
                            <ArrowForwardIosIcon fontSize="large" />
                        </Grid>
                        <Grid item xs={3} align="center">
                            <FindInPageIcon fontSize="large" color="secondary" />
                            <Typography align="center">Projekt wählen</Typography>
                        </Grid>
                        <Grid item xs={1} align="center">
                            <ArrowForwardIosIcon fontSize="large" />
                        </Grid>
                        <Grid item xs={3} align="center">
                            <DoneAllIcon fontSize="large" style={{ color: "#00cc00" }} />
                            <Typography align="center">Beworben</Typography>
                        </Grid>
                        <Grid xs={1} />
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button id="button_letsGo" variant="outlined" onClick={this.handleOpenAbout} >Mehr Erfahren</Button>
                </CardActions>
            </Card>
        </React.Fragment>)
    }
}
export default Description;