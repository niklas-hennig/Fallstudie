import React, {Component} from "react";
import LoginForm from './loginForm';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCompany: false,
            isLogin: false
        }

        this.bottomStyle = {position:'relative', 
                            top:'15%',
                            left: '30%',
                            width: '100%',
                            display: "flex", 
                            flexDirection:"row"
                            }
                            
        this.resetStyle = {
            position: 'relative',
            top: '15%'
        }
        this.styleDefault = {marginRight: "5%",
                            backgroundColor: "#D9D9D9",
                            position: "absolute",
                            width: "40%",
                            height: '60%',
                            textAlign: "center",
                            left: '55%',
                            top: '10%',
                            borderRadius: '200px'
                            }
        this.handlePasswordForgotten= this.handlePasswordForgotten.bind(this);
        
    }
    switchToCompany = () => {
        this.setState({isCompany: true});
    }
    switchToFreelancer = () => {
        this.setState({isCompany: false});
    }
    
    submitHandlerRegister = (event) => {
        this.props.onRegister(true);
    }
    handleLogin = (event) => {
        this.setState({isLogin: true})
        this.props.onLogin(event);
    }
    handlePasswordForgotten(){

    }


    render() {
        let style = this.styleDefault;
        return(
            <div id="login_box" style={style}>
                <div id='top' style={{position:'relative', top:'10%', left:'20%'}}>
		            <button type="button" id="button_selbststaendiger" onClick={this.switchToFreelancer}>Selbstständiger</button>
		            <button type="button" id="button_unternehmen"onClick={this.switchToCompany}>Unternehmen </button>
                </div>
                <LoginForm isCompany={this.state.isCompany} onLoginChange={this.handleLogin}/>
		        <div  style={this.bottomStyle}>
				    <p style={{fontSize: '8px', position: 'relative'}}>Neu hier?</p>
				    <button type="button" id="button_register" onClick={this.submitHandlerRegister}>Registrieren</button>
		        </div>
                <div style={this.resetStyle}>
                    <button onClick={this.handlePasswordForgotten}>Passwort vergessen</button>
                </div>
	        </div>
        )
    }
}

export default Login;