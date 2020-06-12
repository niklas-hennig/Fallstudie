import React, {Component} from "react";
import mailIcon from '../media/mailIcon.png';
import passwordIcon from '../media/passwordIcon.png';
import companyIcon from '../media/companyIcon.png';
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            username: '',
            password: '',
            company:'',
            type: ''
        } 


        this.iconStyle = {
            position: 'relative',
            top: '10px',
            height: '35px'
        }
        this.submitHandlerLogin = this.submitHandlerLogin.bind(this);
        
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    submitHandlerLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:80/api/Authentification', {
            username: this.state.username,
            password: this.state.password,
            type: this.state.type
        })
        .then((res) => {
            console.log(res);
            this.props.onLoginChange('login');
        })
        .catch((err) => {
            console.log(err)
            this.setState({isError: true})
        })
    }

    componentWillReceiveProps(nextProps) {
        let newtype = '';
        if(nextProps.isCompany) newtype='c'
        else newtype='f'
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (newtype !== this.state.type) {
          this.setState({ type: newtype });
        }
      }

    render(){
        let labelcompanyName = '';
        let inputCompanyName = '';
        let error = '';
        let margin = '20%';
        if (this.props.isCompany){
            margin = '15%';
            labelcompanyName = <label for="company">
            <p id="picture_company"></p>
            <img src={companyIcon} alt="companyicon" style={this.iconStyle}/>
            </label>
            inputCompanyName = <input type="text" name="Company_name" placeholder="Firmenname"  required></input>
        }
        if (this.state.isError) {
            error = <div id='error' style={{color: 'red', position: 'relative', 'top': '10%'}}>
                <p>Falscher Nutzername oder Passwort</p>
            </div>
        }
        return <div id='loginForm' style={{position: 'relative', top: margin}}>
                    <form onSubmit={this.submitHandlerLogin} style={{position: 'relative', top: '20%'}}>
                        {labelcompanyName}
                        {inputCompanyName}
                        <label for="user">
                            <p id="picture_user"></p>
                            <img src={mailIcon}  alt="mailicon" style={this.iconStyle}/>
                        </label>
                        <input type="text" name="username" placeholder="Nutzername"  onChange={this.changeHandler}/>
                    
                        <label for="password">
                            <p id="picture_password"></p>
                            <img src={passwordIcon}  alt="passwortIcon" style={this.iconStyle}/>
                        </label>
                        <input type="password" name="password" placeholder="Password" id="password" onChange={this.changeHandler}/>
                    
                        <button type="submit" id="button_login" class="button"><span>Login</span></button>
                    </form>
                    {error}
                </div>
    }
}

export default LoginForm;