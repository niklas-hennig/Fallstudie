import React, {Component} from "react";
import axios from "axios";

class CompleteProfileCompany extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comp_id: this.props.comp_id,
            comp_name: this.props.comp_name,
            street: this.props.street,           
            number: this.props.number,
            postcode: this.props.postcode,
            city: this.props.city,
            country: this.props.country,
            tel_no: null,
            street_bill: null,
            number_bill: null,
            postcode_bill: null,
            city_bill: null,
            description: null,
            is_set: "true",
            //User Info
            name: null,
            surname: null,
            username: null,
            email:null,
            gender: 'f',
            password: null,
            password_check:null,

            //Functional states
            enable_billing: false,
            mailError: false,
            passwordError: false
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.billingHandler = this.billingHandler.bind(this);
    }



    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    billingHandler=(event)=>{
        console.log(event)
        if(this.state.enable_billing) {
            this.setState({enable_billing: false, street_bill:this.state.street, number_bill: this.state.number, postcode_bill:this.state.postcode, city_bill:this.state.city})
        }
        else this.setState({enable_billing: true})
    }

    
    submitHandler = (event) => {
        event.preventDefault();
        console.log("submiting state:")
        console.log(this.state)

        if(this.state.password!=this.state.password_check) {
            this.setState({passwordError: true, mailError:false})
            return
        }else if(!this.state.email.includes('@')) {
            this.setState({mailError: true, passwordError:false})
            return
        }else {
            axios.put('http://localhost:80/api/Company/'+this.state.comp_name, {
                tel_no: this.state.tel_no
            }).then(res => {
                axios.post('http://localhost/api/User/CompanyUser', {
                    name: this.state.name,
                    surname: this.state.surname,
                    username: this.state.username,
                    email:this.state.email,
                    gender: this.state.gender,
                    password: this.state.password,
                    company_name: this.state.comp_name
                })
                .then(res => {
                    this.props.onSubmit('c');
                })
                .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
        }
    }

    componentWillReceiveProps(nextProps) {
            this.setState({
                comp_id: nextProps.comp_id,
                comp_name: nextProps.name,
                street: nextProps.street,           
                number: nextProps.number,
                postcode: nextProps.postcode,
                city: nextProps.city,
                country: nextProps.country})
    }

    render() {
        let billing = ''
        let mailError = ''
        let passwordError = ''

        if (!this.state.enable_billing) billing=
            <div>
                <input type="text" name="bill_street" placeholder="Straße" onChange={this.changeHandler}/><br />
                <input type="number" name="bill_number" placeholder="Hausnummer" onChange={this.changeHandler}/><br />
                <input type="number" name="bill_postcode" placeholder="Postleitzahl" onChange={this.changeHandler}/><br />
                <input type="text" name="bill_city" placeholder="Stadt" onChange={this.changeHandler}/>
                <input type="number" name="bill_tel_no" placeholder="Telefonnummer" onChange={this.changeHandler}/>
            </div>
        let passwordErrror = ''
        if (this.state.passwordError){
            passwordErrror = <p style={{color: 'red', position: 'relative', 'top': '10%'}}>Passwörter stimmen nicht überein</p>
        }

        let mailError = ''
        if (this.state.mailError){
            mailError = <p style={{color: 'red', position: 'relative', 'top': '10%'}}>Keine gültige Mailaddresse</p>


        return(
            <div>
                <h2>Firma {this.state.comp_name}, vervollständige doch dein Profil um gefunden zu werden</h2>
                <div class="completeProfileBox">
                <form id="completeCompany" onSubmit={this.submitHandler}>                    
                    <div id="deliveryAddress">Lieferadresse<br />
                        <input type="text" disabled name="street" placeholder={this.props.street}/><br />
                        <input type="number" disabled name="number" placeholder={this.props.number}/><br />
                        <input type="number" disabled name="postcode" placeholder={this.props.postcode}/><br />
                        <input type="text" disabled name="city" placeholder={this.props.city}/><br />
                        <input type="number" name="tel_no" placeholder="Telefonnummer" onChange={this.changeHandler}/>
                    </div><br />

                    <div id="bill_address">Zahlungsaddresse<br />
                        <input type="checkbox" name="paymentAddressSameAsDelivery" onChange={this.billingHandler}/>Zahlungsaddresse identisch zu Lieferadresse<br /><br />
                        {billing}
                    </div><br /> 
                    <div id="details">Details<br />
                        <textarea rows="10" cols="50" name="description" placeholder="Schreiben Sie etwas über sich"/><br />                            
                        <span>Laden Sie ihr Firmenlogo hoch</span><br />
                        <input name="datei" type="file" size="50" accept="text/*" onChange={this.changeHandler}/><br />
                        <button>Hochladen</button><br />
                    </div>                   
                    <div id="account_info">
                        <input type="text" name="name" placeholder="Name"onChange={this.changeHandler}></input>
                        <input type="text" name="surname" placeholder="Vorname"onChange={this.changeHandler}></input> <br />
                        <input type="text" name="username" placeholder="Nutzername" onChange={this.changeHandler}></input>
                        <input type="text" name="email" placeholder="Email-Addresse"onChange={this.changeHandler}></input>
                        <select name="gender" onChange={this.changeHandler}>
                            <option value="f">Weiblich</option>
                            <option value="m">Männlich</option>
                            <option value="d">Divers</option>
                        </select>
                        <input type="password" name="password" placeholder="Passwort"onChange={this.changeHandler}></input>
                        <input type="password" name="password_check" placeholder="Passwort erneut eingeben"onChange={this.changeHandler}></input>
                        {mailError}
                        {passwordError}
                    </div>
                                        
                    <button type="submit">Speichern</button>
                </form>
                </div>
            </div>
        );
    }
}