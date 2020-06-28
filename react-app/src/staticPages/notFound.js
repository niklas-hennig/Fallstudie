import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer'
import { Grid, Typography, CardHeader, CardContent, Card, CardActions, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

class NotFound extends Component{
    handleBack(){
        window.open('/', '_self')
    }

    render(){
        return <React.Fragment>
            <Header />
            <Grid spacing={5} direction="row" align="center" height="100%">
                <Grid item xs={12} spacing={4}>
                    <Card style={{margin: "5%"}}>
                        <CardContent>
                            <Typography variant="h3" style={{align: "center"}}>Diese Seite konnte nicht gefunden werden</Typography>
                        </CardContent>
                        <CardActions style={{float:"right"}}>
                            <Button size="large" onClick={this.handleBack} startIcon={<HomeIcon fontSize="large"/> }>Zurück zur Startseite</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Footer />
        </React.Fragment>
    }
}
export default NotFound;