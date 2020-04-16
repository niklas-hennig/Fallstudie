import React, { Component } from 'react';
import Description from './description';
import Login from './login'
import Registration from './registration';
import login_background from '../media/login_background.jpg'

class MainContent extends Component {
    constructor(){
        super();
        this.state = {
            Registration: false
        }
        this.style={position: 'absolute', 
                    top: '10%',
                    left: '0%',
                    height: '80%', 
                    display: "flex", 
                    flexDirection:"row", 
                    backgroundImage: `url(${login_background})`
                }
        this.handleRegister = this.handleRegister.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    handleRegister = (event) => {
        this.setState({Registration: true});
    }
    handleBack = (event) => {
        this.setState({Registration: false})
    }

    render() {
        let func = <Login onRegister={this.handleRegister}/>
        if (this.state.Registration){
            func = <Registration onBack={this.handleBack} />
        }
        return (
            <div id='MainContainer' style={this.style}>
                <div id='backgroundImage'>
                    <Description />
                    {func}
                </div>
            </div>
        )
    }
}
export default MainContent;