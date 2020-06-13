import React, {Component} from "react";
import axios from "axios";

class CompleteProfile extends Component{
    constructor(props){
        super(props)
        this.state = { 
            //Both
            street: null,
            number: null,
            postcode: null,
            city: null,
            country: null,
        }
        if(this.props.isFreelancerSetting) {
            this.state = {
                //Freelancer
                username: this.props.userinfo['username'],
                type: this.props.userinfo['type'],
                email: null,
                name: null,
                surname: null,
                gender: null,           
                date_of_birth: null,
                resume_link: null,
                iban: null,
                ktn_owner: null,
                experience: null,
            }

        } else {
            this.state = {
                //Company
                comp_id: this.props.comp_id,
                tel_no: null,
                street_bill: null,
                number_bill: null,
                postcode_bill: null,
                city_bill: null,
                description: null,
            }

        }
        

    }

    componentDidMount() {
        if(this.props.isFreelancerSetting) {
            axios.get('http://localhost:80/api/User/'+this.state.username + '/'+ this.state.type)
            .then(data => {
                this.setState({
                    email: data.data['email'],
                    name: data.data['name'],
                    surname: data.data['surname'],
                    gender: data.data['gender'],           
                    date_of_birth: data.data['date_of_birth'],
                    street: data.data['street'],
                    number: data.data['number'],
                    postcode: data.data['postcode'],
                    city: data.data['city'],
                    country: data.data['country'],
                    resume_link: data.data['resume_link'],
                    iban: data.data['iban'],
                    ktn_owner: data.data['ktn_owner'],
                    experience: data.data['experience'] })
            }) 
        } else {
            axios.get('http://localhost:80/api/Company/'+ this.state.comp_id)
            .then(data => {
                this.setState({
                    street: data.data['street'],
                    number: data.data['number'],
                    postcode: data.data['postcode'],
                    city: data.data['city'],
                    country: data.data['country'],
                    comp_id: data.data['comp_id'],
                    tel_no: data.data['tel_no'],
                    street_bill: data.data['street_bill'],
                    number_bill: data.data['number_bill'],
                    postcode_bill: data.data['postcode_bill'],
                    city_bill: data.data['city_bill'],
                    description: data.data['description'] })
                
        })
       }
    }

    render(){
        if (this.props.isFreelancerSetting){
            return (
                <div>
                    <p>Profilvervollständigung für Freelancer</p>
                    <CompleteProfileFreelancer userinfo={this.state}/>
                </div>
                );
        }else{
            return (
                <div>
                    <p>Profilvervollständigung für Unternehmen</p>
                    <CompleteProfileCompany userinfo={this.props.name}/>
                </div>
                );
        }
    }
}

class CompleteProfileFreelancer extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                email: this.props.userinfo['email'],
                name: this.props.userinfo['name'],
                surname: this.props.userinfo['surname'],
                gender: this.props.userinfo['gender'],           
                date_of_birth: null,
                street: null,
                number: null,
                postcode: null,
                city: null,
                country: null,
                resume_link: null,
                iban: null,
                ktn_owner: null,
                experience: null,
                is_set: "true"  
            }
    }
    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.put('http://localhost:80/api/User/Freelancer', {
        username: this.props.userinfo['username'],
        date_of_birth: this.state.date_of_birth,
        street: this.state.street,
        number: this.state.number,
        postcode: this.state.postcode,
        city: this.state.city,
        country: this.state.country,
        resume_link: this.state.resume_link,
        iban: this.state.iban,
        ktn_owner: this.state.ktn_owner,
        experience: this.state.experience,
        is_set:this.state.is_set
    }) 
    }

    render() {
        let anrede = "Lieber"
        if(this.props.userinfo['gender']=='f') {
            anrede= 'Liebe'
        } if(this.props.userinfo['gender'] == 'd') {
            anrede='Hallo'
        } 

        return(
            <div>
                <h2>{anrede} {this.props.userinfo['surname']} {this.props.userinfo['name'] }, vervollständige doch dein Profil um gefunden zu werden</h2>
                <div class="completeProfileBox">
                <form id="completeFreelancer" onSubmit={this.submitHandler}>
                    <div id="personal">Persönliches<br />
                        <input type="text" disabled="true" name="name" placeholder= {this.props.userinfo['name']} onChange={this.changeHandler} /><br />
                        <input type="text" disabled="true" name="surname" placeholder= {this.props.userinfo['surname']} onChange={this.changeHandler}/><br />
                        <input type="date" name="date_of_birth" placeholder="Geburtsdatum" onChange={this.changeHandler}/><br />
                    </div><br />

                    <div id="address">Adresse<br />
                        <input type="text" name="street" placeholder="Straße" onChange={this.changeHandler}/><br />
                        <input type="number" name="number" placeholder="Hausnummer" onChange={this.changeHandler}/><br />
                        <input type="number" name="postcode" placeholder="Postleitzahl" onChange={this.changeHandler}/><br />
                        <input type="text" name="city" placeholder="Stadt" onChange={this.changeHandler}/>
                    </div><br />

                    <div id="banking">Bankdaten<br />
                        <input type="text" name="iban" placeholder="IBAN" onChange={this.changeHandler}/><br />
                        <input type="text" name="ktn_owner" placeholder="Kontoinhaber" onChange={this.changeHandler}/>
                    </div><br />

                    <div id="details">Details<br />
                        <textarea rows="10" cols="50" name="experience" placeholder="Schreiben Sie etwas über sich" onChange={this.changeHandler}/><br />
                        <span>Wählen Sie eine oder mehrere Kategorien für die Sie sich interessieren</span><br />
                        <select>
                            <option>Test1</option>
                            <option>Test2</option>
                            <option>Test3</option>
                        </select>                            
                        <span>Laden Sie ihren Lebenslauf hier hoch</span><br />
                        <input name="datei" type="file" size="50" accept="text/*" onChange={this.changeHandler}/><br />
                        <button>Hochladen</button><br />
                    </div>
                    <button type="submit">Speichern</button>
                </form>
                </div>
            </div>
        );
    }
}

class CompleteProfileCompany extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                comp_id: this.props.comp_id,
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
                is_set: "true"  
            }
    }
    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    
    submitHandler = (event) => {
        event.preventDefault();
        /*
        axios.put('http://localhost:80/api/User/CompanyUser', { //nochmal prüfen
        username: this.props.userinfo['username'],
        date_of_birth: this.state.date_of_birth,
        street: this.state.street,
        number: this.state.number,
        postcode: this.state.postcode,
        city: this.state.city,
        country: this.state.country,
        resume_link: this.state.resume_link,
        iban: this.state.iban,
        ktn_owner: this.state.ktn_owner,
        experience: this.state.experience,
        is_set:this.state.is_set
    })
    */ 
    }
    render() {
        return(
            <div>
                <h2>Firma {this.state.name}, vervollständige doch dein Profil um gefunden zu werden</h2>
                <div class="completeProfileBox">
                <form id="completeCompany" onSubmit={this.submitHandler}>                    
                    <div id="deliveryAddress">Lieferadresse<br />
                        <input type="text" disabled="true" name="street" placeholder={this.props.street} onChange={this.changeHandler}/><br />
                        <input type="number" disabled="true" name="number" placeholder="Hausnummer" onChange={this.changeHandler}/><br />
                        <input type="number" disabled="true" name="postcode" placeholder="Postleitzahl" onChange={this.changeHandler}/><br />
                        <input type="text" disabled="true" name="city" placeholder="Stadt" onChange={this.changeHandler}/><br />
                        <input type="number" name="tel_no" placeholder="Telefonnummer" onChange={this.changeHandler}/>
                    </div><br />

                    <div id="bill_address">Zahlungsaddresse<br />
                        <input type="checkbox" name="paymentAddressSameAsDelivery" onChange={this.changeHandler}/>Zahlungsaddresse identisch zu Lieferadresse<br /><br />
                        <input type="text" name="bill_street" placeholder="Straße" onChange={this.changeHandler}/><br />
                        <input type="number" name="bill_number" placeholder="Hausnummer" onChange={this.changeHandler}/><br />
                        <input type="number" name="bill_postcode" placeholder="Postleitzahl" onChange={this.changeHandler}/><br />
                        <input type="text" name="bill_city" placeholder="Stadt" onChange={this.changeHandler}/>
                        <input type="number" name="bill_tel_no" placeholder="Telefonnummer" onChange={this.changeHandler}/>
                    </div><br />                    

                    <div id="banking">Bankdaten<br />
                        <input type="text" name="iban" placeholder="IBAN" onChange={this.changeHandler}/><br />
                        <input type="text" name="ktn_owner" placeholder="Kontoinhaber" onChange={this.changeHandler}/>
                    </div><br />

                    <div id="details">Details<br />
                        <textarea rows="10" cols="50" name="description" placeholder="Schreiben Sie etwas über sich"/><br />                            
                        <span>Laden Sie ihr Firmenlogo hoch</span><br />
                        <input name="datei" type="file" size="50" accept="text/*" onChange={this.changeHandler}/><br />
                        <button>Hochladen</button><br />
                    </div>
                    <button type="submit">Speichern</button>
                </form>
                </div>
            </div>
        );
    }
}

export default CompleteProfile;