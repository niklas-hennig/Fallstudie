import React, {Component} from "react";
import axios from "axios";

class RegistrationForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            continue: false,
            registration: false,
            name: 'testcompany',
            street: '',
            number: '',
            postcode: '',
            city: '',
            country: 'Deutschland'
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
        if (this.state.registration==true){
            axios.post('http://localhost:80/api/Company', {
                name: this.state.name,
                street: this.state.street,
                number: this.state.number,
                postcode: this.state.postcode,
                city: this.state.city,
                country: this.state.country
            })
            .then((res) => {
                this.props.onRegistered(res.data);
            })
            .catch((err) => {
                console.log('Error in company submit')
                console.error(err)
            })
        }else{
            this.searchHandler(event);
        }
    }

    searchHandler = (event) => {
        event.preventDefault();
        axios.get('http://localhost:80/api/Company/Existence/'+this.state.name)
        .then((res) => {
            if(res.data){
                this.props.onRegistered(true);
            }else{
                this.setState({registration: true})
            }
        })
        .catch((err) => {
            console.log('Error in company search')
            console.error(err)
        })
    }

    render(){
        let passwordErrror = ''
        if (this.state.passwordError){
            passwordErrror = <p style={{color: 'red', position: 'relative', 'top': '10%'}}>Passwörter stimmen nicht überein</p>
        }

        let registeredBtn = 'Suchen'
        let registered = ''
        let fullForm = ''
        if (this.state.registration){
            registeredBtn = 'Registrieren'
            registered = 
            <div>
                <p>Registierung erfolgreich</p>
            </div>
            fullForm = 
            <div>
                <label >Bitte neues Unternehmen anlegen</label><br></br>
                <input type="text" name="street" placeholder="Street" onChange={this.changeHandler}/>
                <input type="number" name="number" placeholder="Number" onChange={this.changeHandler}/>
                <input type="number" name="postcode" placeholder="Postcode" onChange={this.changeHandler}/>
                <input type="text" name="city" placeholder="City" onChange={this.changeHandler}/>
                <select id="country" name="country">
                    <option value="Germany">Deutschland</option>
                </select>
            </div>
        }

        return <div id="RegistrationForm" style={{width: '60%', left: '20%', top: '15%', position: 'relative'}}>
            <form onSubmit={this.submitHandler} style={{position: 'relative', top: '20%'}}>
                <div style={this.divStyle}>
                    <input type="text" name="name" placeholder="Name" onChange={this.changeHandler}/>
                </div>
                {fullForm}
                <button type="submit" id="search_company" class="button"><span>{registeredBtn}</span></button>
            </form>
        </div>
    }


}

export default RegistrationForm;