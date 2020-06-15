import React, {Component} from "react";
import mailIcon from '../media/mailIcon.png';
import passwordIcon from '../media/passwordIcon.png';
import axios from "axios";

class RegistrationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            gender: 'f',
            username: '',
            password: '',
            password_check: '',
            email: '',
            mailError: false
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
        console.log(this.state.email.includes('@'))
        if(this.state.password!=this.state.password_check) {
            this.setState({passwordError: true, mailError:false})
            return
        }else if(!this.state.email.includes('@')) {
            this.setState({mailError: true, passwordError:false})
            return
        }else {
            if (!this.state.registered){
                this.setState({passwordError: false, mailError:false})
                axios.post('http://localhost:80/api/User/Freelancer', {
                    name: this.state.name,
                    surname: this.state.surname,
                    username: this.state.username,
                    gender: this.state.gender,
                    password: this.state.password,
                    email: this.state.email
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
    }

    render(){
        let passwordErrror = ''
        if (this.state.passwordError){
            passwordErrror = <p style={{color: 'red', position: 'relative', 'top': '10%'}}>Passwörter stimmen nicht überein</p>
        }

        let mailError = ''
        if (this.state.mailError){
            mailError = <p style={{color: 'red', position: 'relative', 'top': '10%'}}>Keine gültige Mailaddresse</p>
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
                        <div style={this.divStyle}>
                        <input type="text" name="name" placeholder="Name" onChange={this.changeHandler}/>
                        <input type="text" name="surname" placeholder="Vorname" onChange={this.changeHandler}/>
                        </div>
                        <select name="gender" onChange={this.changeHandler}>
                            <option value="f">Weiblich</option>
                            <option value="m">Männlich</option>
                            <option value="d">Divers</option>
                        </select>
                        <div style={this.divStyle}>
                            <input type="text" name="email" placeholder="E-Mail" onChange={this.changeHandler}/>
                        </div>
                        <div style={this.divStyle}>
                            <input type="text" name="username" placeholder="Nutzername" onChange={this.changeHandler}/>
                        </div>
                        <div style={this.divStyle}>
                            <input type="password" name="password" placeholder="Passwort" onChange={this.changeHandler}/>
                            <input type="password" name="password_check" placeholder="Passwort erneut eingeben" onChange={this.changeHandler}/>
                            {passwordErrror}
                            {mailError}
                        </div>
                        {registered}
                        <button type="submit" id="button_login" class="button"><span>{registeredBtn}</span></button>
                    </form>
                </div>
    }

}
export default RegistrationForm;