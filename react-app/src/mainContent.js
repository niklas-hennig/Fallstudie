import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from "axios";

//Landing page imports
import Description from './landing/description';
import Login from './landing/login';
import Registration from './landing/registration';
import login_background from './media/login_background.jpg';

//Complete Profile
import CompleteProfile from './CompleProfile/completeProfile';

//Home-Screen imports
import LeftBar from './homeScreen/leftBar';
import RightBar from './homeScreen/rightBar';
import Carousel from './homeScreen/carousel';
import Axios from 'axios';


const transport = axios.create({
    withCredentials: true
  })

class MainContent extends Component {
    constructor(){
        super();
        this.state = {
            Registration: false,
            login: false,             //Change to false, in develeopment to circumvent login (true)
            auth: null,
            content: null,
            settingsIsFreelancer: true,
            company_name: null
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
        this.handleCompanyComplete = this.handleCompanyComplete.bind(this);
        this.handleSettingsComplete = this.handleSettingsComplete.bind(this);
    }

    componentDidMount(){
        this.setState({content: this.getLogin()});
        console.log("cdm")
    }


    handleRegister = (event) => {
        this.setState({content: this.getRegistration()});
    }
    handleBack = (event) => {
        this.setState({content: this.getLogin()})
    }

    handleLogin = (event) => {
        this.setState({auth: event})
        axios.get('http://localhost:80/api/User/'+this.state.auth['username'] + '/'+ this.state.auth['type'], this.state.auth)
        .then(data => {
            if(data.data['is_set']){
                this.setState({content: this.getHome()})
            }else{
                this.setState({content: this.getSettings(), settingsIsFreelancer:true})
            }
        })
        .catch(err => console.log(err))
    }

    handleCompanyComplete = (event) =>{
        console.log('Handle Company')
        console.log(event)
        this.setState({company_name:event, settingsIsFreelancer:false})
        this.setState({content: this.getSettings()})
    }

    handleSettingsComplete = (event) => {
        this.setState({content: this.getHome()})
    }

    getSettings(){
        console.log('comp_id main c')
        console.log(this.state.company_name)
        if(this.state.auth) this.setState({settingsIsFreelancer:true})
        else this.setState({settingsIsFreelancer:false})
        return <CompleteProfile isFreelancerSetting={this.state.settingsIsFreelancer} comp_name={this.state.company_name} userinfo={this.state.auth} onSubmit={this.handleSettingsComplete}></CompleteProfile>
    }

    getLogin(){
        let func = <Login onRegister={this.handleRegister} onLogin={this.handleLogin} />
        return <div id='backgroundImage' style={{backgroundImage: `url(${login_background})`}}>
                    <Description />
                    {func}
                </div>
    }

    getRegistration(){
        let func = <Registration onBack={this.handleBack} onCompanyComplete={this.handleCompanyComplete}/>
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
        let cont = this.state.content
        return (
            <div id='MainContainer' style={this.style}>
                {cont}
            </div>
        )
    }
}
export default MainContent;