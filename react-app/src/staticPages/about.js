import React, { Component } from 'react';
import { Card, CardHeader, CardContent, Grid, Avatar, TextField, MenuItem, Button, Typography, IconButton, CardActions, CardMedia } from "@material-ui/core";
import Header from "../common/Header";
import Footer from "../common/Footer";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import slide_aboutUs from '../media/Slide_aboutUs.jpg';

class About extends Component {
    render() {
        return <div style={{
            

        }}>
            <Header />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardMedia image={require('../media/Slide_aboutUs.jpg')} style={{ height: 0, paddingTop: '9%' }} />
                    </Card>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <h1 style={{ textAlign: "center", fontSize:"25pt" }}>Freelane - Die Projektvermittlungsfirma</h1>
                    <Card id="Card_aboutUs_history">
                        <CardHeader title={<h2>Unsere Geschichte</h2>}>

                        </CardHeader>
                        <CardContent>
                            <Typography><p>Freelane ist ein Startup, das von vier Studenten gegründet wurde, um die Suche
                            nach geeigneten Projekten für Selbstständige in allen Branchen zu erleichtern.
                            In der Vergangenheit war die Situation so, dass die Menschen sich nach der
                            Ausbildung/ dem Studium einen Job suchten, dort jahrelang arbeiteten und nach
                            gewisser Zeit zu einem höheren Job gefördert wurden. Die Situation hat sich
                            allerdings im Lauf der Zeit geändert, denn Fachkräfte suchen aus unterschiedlichsten
                            Gründen nach flexiblen Arbeitsmodellen.
                            Auf der anderen Seite sind zahlreiche Unternehmen in vielen Bereichen von
                            Fachkräftemangel betroffen. Mehr als 50 Prozent der Unternehmen sehen darin die
                            größte Gefahr für ihre Geschäftsentwicklung.
                            Aus dem Grund möchte unsere Plattform Projekt-basierte Stellen zwischen
                            Unternehmen und Suchende flexibler Arbeitsstellen bzw. Selbständige. vermitteln.
                            Damit die Fachkräfte passende Projekte schnell finden, und Unternehmen
                            Spezialistin rechtzeitig erreichen.
                            Bei unserem Logo haben wir uns ganz bewusst für die Farben blau und gelb
                            entschieden. Wir möchten als Freelane das darstellen, für was diese Farben stehen,
                            nämlich Freiheit, Vertrauen, Optimismus und Sicherheit. Der Schmetterling stellt für
                            uns die Verwandlung von einem Arbeitnehmer einer Firma hin zu einem flexiblen,
                            selbstbestimmten Freelancer dar und ist für uns ein Symbol von Freiheit. Die Origami
                            Struktur des Schmetterlings zeigt die Ordnung im Chaos.</p></Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                </Grid>

                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <Card id="Card_aboutUs_team">
                        <CardHeader title={<h2>Unser Team</h2>}>
                        </CardHeader>
                        <CardContent>
                            <Grid container direction="row">
                                <Grid item xs={3}>
                                    <Card id="Card_Team">
                                        <CardHeader id="aboutUs_header" avatar={
                                            <Avatar aria-label="AccountCircleIcon" style={{ backgroundColor: "#D6D6D6" }}>
                                            </Avatar>}
                                            title={"Siham Abulzahab"} subheader={"Risk Management"} >
                                        </CardHeader>
                                        <CardContent>
                                            <Typography>
                                                <p>Lorem ipsum olor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et olore magna
                                                aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo olores et ea rebum. Stet clita kasd gubergren, no sea takimata
                                                sanctus est Lorem ipsum olor sit amet. Lorem ipsum olor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                                ut labore et olore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo olores et ea rebum. Stet clita kasd
                                                gubergren, no sea takimata sanctus est Lorem ipsum olor sit amet.
                                                </p>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={3}>
                                    <Card id="Card_Team">
                                        <CardHeader id="aboutUs_header" avatar={
                                            <Avatar aria-label="AccountCircleIcon" style={{ backgroundColor: "#D6D6D6" }}>
                                            </Avatar>}
                                            title={"Dennis Burkhard"} subheader={"Designer, Marketing"}>
                                        </CardHeader>
                                        <CardContent>
                                            <Typography>
                                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                                                aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                                                sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                                ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                                                gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                                </p>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={3}>
                                    <Card id="Card_Team">
                                        <CardHeader id="aboutUs_header" avatar={
                                            <Avatar aria-label="AccountCircleIcon" style={{ backgroundColor: "#D6D6D6" }}>
                                            </Avatar>}
                                            title={"Niklas Hennig"} subheader={"Developer, Designer"}>
                                        </CardHeader>
                                        <CardContent>
                                            <Typography>
                                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                                                aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                                                sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                                ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                                                gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                                </p>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={3}>
                                    <Card id="Card_Team">
                                        <CardHeader id="aboutUs_header" avatar={
                                            <Avatar aria-label="AccountCircleIcon" style={{ backgroundColor: "#D6D6D6" }}>
                                            </Avatar>}
                                            title={"Vanessa Stutz"} subheader={"Accounting Management"}>
                                        </CardHeader>
                                        <CardContent>
                                            <Typography>
                                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                                                aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                                                sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                                ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                                                gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                                </p>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                </Grid>

                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <Card id="Card_aboutUs_goal">
                        <CardHeader title={<h2>Unser Ziel</h2>}>
                        </CardHeader>
                        <CardContent>
                            <Typography><p>Das Ziel unseres Startups ist es, eine benutzerfreundliche Plattform bereitzustellen,
                            die Unternehmen mit Selbstständigen aus allen Branchen verbindet. Der Erfolg
                            unseres Produkts hängt von der Größe unserer Datenbank ab. Je mehr
                            Selbstständige sich bei uns registrieren, desto höher sind die Chancen der
                            Unternehmen, qualifizierte Human Ressource zu finden. Ebenfalls, je größer die
                            Datenbank der Projekte ist, desto wahrscheinlicher ist es auch, dass Selbstständige
                            nachhaltig und schnell geeignete Projekte finden. Unsere Plattform verarbeitet
                            personenbezogene Daten von Selbstständige und Unternehmen und sollte daher der
                            Allgemeinen Datenschutzverordnung (DSGVO) der EU entsprechen.</p></Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Footer />
            </Grid>
        </Grid>
    }
}
export default About;