import React, { Component } from 'react';

//Landing page imports
import Description from './landing/description';
import Login from './landing/login';
import Registration from './landing/registration';
import login_background from './media/login_background.jpg';

//Home-Screen imports
import LeftBar from './homeScreen/leftBar';
import RightBar from './homeScreen/rightBar';
import Carousel from './homeScreen/carousel';

class MainContent extends Component {
    constructor(){
        super();
        this.state = {
            Registration: false,
            login: true             //Change to false, in develeopment to circumvent login
        }
        this.style={position: 'absolute', 
                    top: '8%',
                    left: '0%',
                    height: '85%',
                    width: '100%', 
                    display: "flex", 
                    flexDirection:"row"                    
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
    handleLogin = (event) => {
        this.setState({login: true})
    }

    getLogin(){
        let func = <Login onRegister={this.handleRegister} onLogin={this.handleLogin}/>
        if (this.state.Registration){
            func = <Registration onBack={this.handleBack}/>
        }
        return <div id='backgroundImage' style={{backgroundImage: `url(${login_background})`}}>
                    <Description />
                    {func}
                </div>
    }
    getHome(){
        return <div>
                    <LeftBar />
                    <Carousel />
                    <RightBar />
                </div>
    }

    render() {
        let content = ''
        if (!this.state.login){
            content = this.getLogin();
        }else{
            content = this.getHome();
        }
        return (
            <div id='MainContainer' style={this.style}>
                {content}
            </div>
        )
    }
}
export default MainContent;