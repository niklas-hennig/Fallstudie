import React, {Component} from "react";
import axios from "axios";


class CompleteProfileFreelancer extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                username: this.props.username,
                email: this.props.email,
                name: this.props.name,
                surname: this.props.surname,
                gender: this.props.gender,           
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
                is_set: "true",
                prefences_available: [],
                prefence: null 
            }
    }
    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    fetchPrefences() {
        let pref = []
        let key = ''
        axios.get('http://localhost:80/api/Prefence/')
        .then(res => {
            console.log(res.data)
            for(key in res.data){
                console.log(res.data[key])
                pref.push(res.data[key]['pref_name'])
            }
            this.setState({prefences_available: pref})
        })
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
        }).then(res =>{
            axios.put('http://localhost:80/api/Prefence/'+this.state.username, {
                prefence: this.state.prefence
            }).then(this.props.onSubmit('f'))
            .catch(err => console.error(err))
            
        })
    }

    componentWillMount(){
        this.fetchPrefences()
    }

    render() {
        let anrede = "Lieber"
        if(this.props.gender=='f') {
            anrede= 'Liebe'
        } if(this.props.gender == 'd') {
            anrede='Hallo'
        } 

        return(
            <div>
                <h2>{anrede} {this.props.surname} {this.props.name }, vervollständige doch dein Profil um gefunden zu werden</h2>
                <div class="completeProfileBox">
                <form id="completeFreelancer" onSubmit={this.submitHandler}>
                    <div id="personal">Persönliches<br />
                        <input type="text" disabled name="name" placeholder= {this.props.name}/><br />
                        <input type="text" disabled name="surname" placeholder= {this.props.surname} /><br />
                        <input type="date" name="date_of_birth" placeholder="Geburtsdatum" onChange={this.changeHandler} required/><br />
                    </div><br />

                    <div id="address">Adresse<br />
                        <input type="text" name="street" placeholder="Straße" onChange={this.changeHandler} required/><br />
                        <input type="number" name="number" placeholder="Hausnummer" onChange={this.changeHandler} required/><br />
                        <input type="number" name="postcode" placeholder="Postleitzahl" onChange={this.changeHandler} required/><br />
                        <input type="text" name="city" placeholder="Stadt" onChange={this.changeHandler} required/>
                    </div><br />

                    <div id="banking">Bankdaten<br />
                        <input type="text" name="iban" placeholder="IBAN" onChange={this.changeHandler}/><br />
                        <input type="text" name="ktn_owner" placeholder="Kontoinhaber" onChange={this.changeHandler}/>
                    </div><br />

                    <div id="details">Details<br />
                        <textarea rows="10" cols="50" name="experience" placeholder="Schreiben Sie etwas über sich" onChange={this.changeHandler}/><br />
                        <span>Wählen Sie eine oder mehrere Kategorien für die Sie sich interessieren</span><br />
                        <select name="prefence">
                            {this.state.prefences_available.map((name) => <option key={name}>{name}</option>)}
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


export default CompleteProfileFreelancer;