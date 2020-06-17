import React, { Component } from 'react';
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


//Freelancer-Only pages
import RoleDetail from './Freelancer/role_detail';

//Company-Only pages
import ProjectDetail from './Company/project_detail';
import ProjectCreate from './Company/project_create';

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
        this.handleRoleSelected=this.handleRoleSelected.bind(this);
        this.handleProjectSelected = this.handleProjectSelected.bind(this);
        this.handleRoleApplicationSelected=this.handleRoleApplicationSelected.bind(this);
        this.handleBackToHome=this.handleBackToHome.bind(this);
        this.handleProjectCreate = this.handleProjectCreate.bind(this);
    }

    componentDidMount(){
        this.setState({content: this.getLogin()});
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
        this.setState({company_name:event, settingsIsFreelancer:false})
        this.setState({content: this.getSettings()})
    }

    handleSettingsComplete = (event) => {
        this.setState({content: this.getLogin()})
    }

    handleRoleSelected(id){
        console.log("changing to " + id)
        this.setState({content: null})
        let cont = this.getRoleDetail(id)
        console.log(cont)
        this.setState({content: cont})
    }

    handleProjectSelected(id){
        this.setState({content: this.getProjectDetail(id)})
    }

    //not used
    handleRoleApplicationSelected(id){
        console.log("selected application: "+id)
    }

    handleBackToHome(){
        this.setState({content:this.getHome()})
    }

    handleProjectCreate(){
        this.setState({content: this.getProjectCreation()})
    }

    getSettings(){
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
        let username = null
        let type='c'
        let auth = null
        let comp_id = null
        username= this.state.auth['username']
        type=this.state.auth['type']
        auth= this.state.auth['private']
        return <div>
                    <LeftBar username={username} type={type} token={auth} comp_id={comp_id} onRoleSelect={this.handleRoleSelected} onProjectSelected={this.handleProjectSelected}/>
                    <Carousel username={username} type={type} token={auth} comp_id={comp_id} onRoleSelect={this.handleRoleSelected} onProjectSelected={this.handleProjectSelected} onProjectCreate={this.handleProjectCreate}/>
                    <RightBar username={username} type={type} token={auth} comp_id={comp_id} onApplicationSelect={this.handleRoleApplicationSelected}/>
                </div>
    }

    getRoleDetail(role_id){
        console.log("showing role"+role_id)
        let username = null
        let type='c'
        let auth = null
        let comp_id = null
        username= this.state.auth['username']
        type=this.state.auth['type']
        auth= this.state.auth['private']
        return <div>
            <LeftBar username={username} type={type} token={auth} comp_id={comp_id} onRoleSelect={this.handleRoleSelected} onProjectSelected={this.handleProjectSelected}/>
            <RoleDetail role_id={role_id} token={auth} onBack={this.handleBackToHome}></RoleDetail>
            <RightBar username={username} type={type} token={auth} comp_id={comp_id} onApplicationSelect={this.handleRoleApplicationSelected}/>
        </div>
    }

    getProjectDetail(project_id){
        let username = null
        let type='c'
        let auth = null
        let comp_id = null
        username= this.state.auth['username']
        type=this.state.auth['type']
        auth= this.state.auth['private']
        return <div>
        <LeftBar username={username} type={type} token={auth} comp_id={comp_id} onRoleSelect={this.handleRoleSelected} onProjectSelected={this.handleProjectSelected}/>
        <ProjectDetail project_id={project_id} token={auth} onBack={this.handleBackToHome}></ProjectDetail>
        <RightBar username={username} type={type} token={auth} comp_id={comp_id} onApplicationSelect={this.handleRoleApplicationSelected}/>
        </div>
    }

    getProjectCreation(){
        let username = null
        let type='c'
        let auth = null
        let comp_id = null
        username= this.state.auth['username']
        type=this.state.auth['type']
        auth= this.state.auth['private']
        return <div>
            <LeftBar username={username} type={type} token={auth} comp_id={comp_id} onRoleSelect={this.handleRoleSelected} onProjectSelected={this.handleProjectSelected}/>
            <ProjectCreate></ProjectCreate>
            <RightBar username={username} type={type} token={auth} comp_id={comp_id} onApplicationSelect={this.handleRoleApplicationSelected}/>
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