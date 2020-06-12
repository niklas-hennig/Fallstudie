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
        
        let person =''
        let company =''
        if (this.props.isCompany) {
            company = 
            <div>
                <label for='companyName'>                
                  <p id="picture_company"></p>
                  <img src={companyIcon} alt="companyicon" style={this.iconStyle}/>
                </label> 
                <div class="registerField">
                    <input type="text"required></input>
                    <span class="label">Firmenname</span>
                </div>

                <div class="registerField">
                    <input type="text"required></input>
                    <span class="label">Postleitzahl</span>
                </div>

                <div class="registerField">
                    <input type="text"required></input>
                    <span class="label">Ort</span>
                </div>

                <div class="registerField">
                    <input type="text"required></input>
                    <span class="label">Straße</span>
                </div>

                <div class="registerField">
                    <input type="text"required></input>
                    <span class="label">Hausnummer</span>
                </div>

                <div class="registerField">
                    <input type="text"required></input>
                    <span class="label">Land</span>
                </div>
                
            </div>
        } else {
            person =
            <div>
                <select id="gender" name="Geschlecht">
                    <option value = "m">Männlich</option>
                    <option value = "w">Weiblich</option>
                    <option value = "d">Divers</option>
                </select>  <br></br>
                <input type="text" name="name" placeholder="Name" required></input><br></br>
                <input type="text" name="surname" placeholder="Vorname" required></input><br></br>
                <input type="text" name="email" placeholder="E-Mail" required></input><br></br>
                <input type="text" name="username" placeholder="Nutzername"required></input><br></br>
            </div>

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
        return <div class='RegistrationForm' style={{width: '60%', left: '20%', top: '15%', position: 'relative', paddingRight: '40px', paddingTop: '20px' }}>
                    <form onSubmit={this.submitHandler} style={{position: 'relative', top: '20%'}}>
                        
                        {person}
                        {company}

                        <div class="registerField">
                            <input type="password"required></input>
                            <span class="label">Passwort</span>
                        </div>

                        <div class="registerField">
                            <input type="password"required></input>
                            <span class="label">Passwort wiederholen</span>
                            {passwordErrror}
                        </div>
                        
                       
                            
                        
                        {registered}
                        <button type="submit" id="button_login" class="button"><span>{registeredBtn}</span></button>
                    </form>
                </div>
    }

}
export default RegistrationForm;