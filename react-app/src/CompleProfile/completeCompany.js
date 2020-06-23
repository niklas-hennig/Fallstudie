import React, {Component} from "react";
import axios from "axios";

class CompleteProfileCompany extends Component {
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
            tel_no: this.props.tel_no,
            street_bill: this.props.street_bill,
            number_bill: this.props.number_bill,
            postcode_bill: this.props.postcode_bill,
            city_bill: this.props.city_bill,
            description: this.props.description,
            is_set: "true",
            //User Info
            name: null,
            surname: null,
            username: this.props.username,
            email:null,
            gender: 'f',
            password: null,
            password_check:null,

            //Functional states
            enable_billing: true,
            mailError: false,
            passwordError: false,
            isChange: this.props.isChange
        }
        
        this.changeHandler = this.changeHandler.bind(this);
        this.billingHandler = this.billingHandler.bind(this);
    }


    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    billingHandler=(event)=>{
        if(this.state.enable_billing) {
            this.setState({enable_billing: false, street_bill:this.state.street, number_bill: this.state.number, postcode_bill:this.state.postcode, city_bill:this.state.city})
        }
        else this.setState({enable_billing: true})
    }

    
    submitHandler = (event) => {
        event.preventDefault();

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
                if(this.state.isChange!==true){
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
                }else{
                    axios.put('http://localhost/api/User/CompanyUser', {
                        name: this.state.name,
                        surname: this.state.surname,
                        username: this.state.username,
                        email:this.state.email,
                        gender: this.state.gender,
                        password: this.state.password,
                        company_name: this.state.comp_name
                    })
                    .then(res => {
                        this.props.onBack();
                    })
                    .catch(err => console.error(err))
                }
            })
            .catch(err => console.error(err))
        }

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            comp_id: nextProps.comp_id,
            comp_name: nextProps.name,
            street: nextProps.street,           
            number: nextProps.number,
            postcode: nextProps.postcode,
            city: nextProps.city,
            country: nextProps.country,
            description: nextProps.description})
            if(this.props.street_bill) this.setState({enable_billing: false})
    }

    render() {
        let billing = ''
        let mailError = ''
        let passwordError = ''
        let disable = ''
        if(this.state.isChange) disable='disabled'

        if (!this.state.enable_billing) billing=
            <div>
                <input type="text" name="bill_street" placeholder={this.state.street_bill} onChange={this.changeHandler}/><br />
                <input type="number" name="bill_number" placeholder={this.state.number_bill} onChange={this.changeHandler}/><br />
                <input type="number" name="bill_postcode" placeholder={this.state.postcode_bill} onChange={this.changeHandler}/><br />
                <input type="text" name="bill_city" placeholder={this.state.city_bill} onChange={this.changeHandler}/>
            </div>
        if (this.state.passwordError){
            passwordError = <p style={{color: 'red', position: 'relative', 'top': '10%'}}>Passwörter stimmen nicht überein</p>
        }

        if (this.state.mailError){
            mailError = <p style={{color: 'red', position: 'relative', 'top': '10%'}}>Keine gültige Mailaddresse</p>
        }

        return(
            <div>
                <h2>Firma {this.state.comp_name}, vervollständige doch dein Profil um gefunden zu werden</h2>
                <div class="completeProfileBox">
                <form id="completeCompany" onSubmit={this.submitHandler}>                    
                    <div id="deliveryAddress">Lieferadresse<br />
                        <input type="text" {...disable} name="street" placeholder={this.props.street}/><br />
                        <input type="number" {...disable} name="number" placeholder={this.props.number}/><br />
                        <input type="number" {...disable} name="postcode" placeholder={this.props.postcode}/><br />
                        <input type="text" {...disable} name="city" placeholder={this.props.city}/><br />
                        <input type="text" name="country" onChange={this.changeHandler} />
                        <input type="number" name="tel_no" placeholder={this.props.tel_no} onChange={this.changeHandler}/>
                    </div><br />

                    <div id="bill_address">Zahlungsaddresse<br />
                        <input type="checkbox" name="paymentAddressSameAsDelivery" onChange={this.billingHandler}/>Zahlungsaddresse abweichend zu Lieferadresse<br /><br />
                        {billing}
                    </div><br /> 
                    <div id="details">Details<br />
                        <textarea rows="10" cols="50" name="description" placeholder={this.state.description}/><br />                            
                    </div>                   
                    <div id="account_info">
                        <input type="text" name="name" placeholder={this.state.name} onChange={this.changeHandler}></input>
                        <input type="text" name="surname" placeholder={this.state.surname} onChange={this.changeHandler}></input> <br />
                        <input type="text" name="username" placeholder="Nutzername" onChange={this.changeHandler}></input>
                        <input type="text" name="email" placeholder={this.state.email} onChange={this.changeHandler}></input>
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

    componentDidMount(){
        if(this.props.street_bill) this.setState({enable_billing: false})
        axios.get('http://localhost:80/api/User/'+this.state.username + '/c/')
        .then(data => {
            this.setState({
                name: data.data.name,
                surname: data.data.surname,
                email: data.data.email
            })
        })
        .catch(err => console.log(err))
    }
}

export default CompleteProfileCompany;