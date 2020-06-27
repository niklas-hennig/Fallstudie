import React, {Component} from "react";
import axios from "axios";
import { TextField, Grid, MenuItem } from "@material-ui/core";

class RegistrationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            gender: '',
            username: '',
            password: '',
            password_check: '',
            email: '',
            mailError: false
        }
    }
    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    submitHandler = (event) => {
        event.preventDefault();
        if(this.state.password!==this.state.password_check) {
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
        let passwordError = ''
        if (this.state.passwordError){
            passwordError = <p style={{color: 'red', position: 'relative', 'top': '10%'}}>Passwörter stimmen nicht überein</p>
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
        return (<form onSubmit={this.submitHandler} >
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <TextField required name="name" label="Name" value={this.state.name} onChange={this.changeHandler} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required name="surname" label="Vorname" value={this.state.surname} onChange={this.changeHandler} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth="true" required select name="gender" helperText="Geschlecht" value={this.state.gender} onChange={this.changeHandler}>
                                <MenuItem value="f">Weiblich</MenuItem>
                                <MenuItem value="m">Männlich</MenuItem>
                                <MenuItem value="d">Divers</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth="true" name="email" label="E-Mail Addresse" value={this.state.email} onChange={this.changeHandler} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth="true" name="username" label="Nutzername" value={this.state.username} onChange={this.changeHandler} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required fullWidth="true" type="password" name="password" label="Passwort" value={this.state.password} onChange={this.changeHandler} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required fullWidth="true" type="password" name="password_check" label="Passwort erneut eingeben" value={this.state.password_check} onChange={this.changeHandler} />
                        </Grid>
                        {passwordError}
                        {mailError}
                        {registered}
                    </Grid>
                    <button type="submit" id="button_login" class="button"><span>{registeredBtn}</span></button>
                    </form>
                )
    }

}
export default RegistrationForm;