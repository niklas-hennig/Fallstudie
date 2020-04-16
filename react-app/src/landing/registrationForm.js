import React, {Component} from "react";
import mailIcon from '../media/mailIcon.png';
import passwordIcon from '../media/passwordIcon.png';
import companyIcon from '../media/companyIcon.png';
import axios from "axios";

class RegistrationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            username: '',
            password: '',
            email: '',
            companyName: ''
        }
        this.iconStyle = {
            position: 'relative',
            top: '10px',
            height: '35px'
        }
        this.divStyle = {
            position: 'relative',
            top: '50%'
        }
    }
    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.registered){
            axios.post('http://192.168.178.33:80/api/User', {
                name: this.state.name,
                surname: this.state.surname,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                companyName: this.state.companyName
            })
            .then((res) => {
                this.setState({registered: true})
            })
            .catch((err) => {
                console.error(err)
            })
        }else{
            this.props.onRegistered(true);
        }
    }
    render(){
        let companyName = ''
        let inputCompanyName = ''
        if (this.props.isCompany) {
            companyName = <label for='companyName'>
                <p id="picture_company"></p>
                <img src={companyIcon} alt="companyicon" style={this.iconStyle}/>
            </label>
            inputCompanyName = <input type="text" name="companyName" placeholder="Firmenname"  required></input>
        }

        let passwordErrror = ''
        if (this.state.passwordError){
            passwordErrror = <p style={{color: 'red', position: 'relative', 'top': '10%'}}>Passwörter stimmen nicht überein</p>
        }

        let registeredBtn = 'Anmelden'
        let registered = ''
        if (this.state.registered){
            registeredBtn = 'Zurück'
            registered = <div>
                <p>Registierung erfolgreich</p>
            </div>
        }
        return <div id='RegistrationForm' style={{width: '60%', left: '20%', top: '15%', position: 'relative'}}>
                    <form onSubmit={this.submitHandler} style={{position: 'relative', top: '20%'}}>
                        {companyName}
                        {inputCompanyName}
                        <div style={this.divStyle}>
                        <input type="text" name="name" placeholder="Name" onChange={this.changeHandler}/>
                        <input type="text" name="surname" placeholder="Vorname" onChange={this.changeHandler}/>
                        </div>
                        <div style={this.divStyle}>
                            <input type="text" name="email" placeholder="E-Mail" onChange={this.changeHandler}/>
                        </div>
                        <div style={this.divStyle}>
                            <input type="text" name="username" placeholder="Nutzername" onChange={this.changeHandler}/>
                        </div>
                        <div style={this.divStyle}>
                            <input type="password" name="password" placeholder="Passwort" onChange={this.changeHandler}/>
                            <input type="password" name="password" placeholder="Passwort erneut eingeben" onChange={this.changeHandler}/>
                            {passwordErrror}
                        </div>
                        {registered}
                        <button type="submit" id="button_login" class="button"><span>{registeredBtn}</span></button>
                    </form>
                </div>
    }

}
export default RegistrationForm;