import React, { Component } from 'react';

import { Grid } from '@material-ui/core';

import MainContent from './common/mainContent';
import Footer from './common/Footer';
import Header from './common/Header';

class ContentWrapper extends Component{
    constructor(props){
        super(props)
        this.state={
            auth: null,
            username: null,
            toSettings: false,
            mainContentHeight: 0
        }
        this.handleLogin=this.handleLogin.bind(this);
        this.handleSettings=this.handleSettings.bind(this);
    }

    handleLogin = (event) => {
        this.setState({auth: event, username: event['username']})
    }

    handleSettings = (event) => {
        this.setState({toSettings: true})
    }



    render(){
        return (
        <Grid container direction="column" id="contentWrapper">
            <Grid item ref={(elem) => this.header = elem} >
                <Header user={this.state.username} onSettings={this.handleSettings} />
            </Grid>
            <Grid item container>
                <MainContent onLogin={this.handleLogin} goToSettings={this.state.toSettings} height={this.state.mainContentHeight}></MainContent>
            </Grid>  
            <Grid item container>
                <Grid item xs={"auto"}/>
                <Grid item container xs={3}>
                    <Footer />
                </Grid>
                <Grid item xs={"auto"}/>
            </Grid>          
        </Grid>
        )
    }

    
}

export default ContentWrapper;