import React, {Component} from "react";
import axios from "axios";
import { TextField, Card, MenuItem, Grid, Button} from "@material-ui/core";

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
        if (this.state.registration===true){
            axios.post('http://localhost:80/api/Company', {
                name: this.state.name,
                street: this.state.street,
                number: this.state.number,
                postcode: this.state.postcode,
                city: this.state.city,
                country: this.state.country
            })
            .then((res) => {
                console.log("respone")
                console.log(res.data)
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
                this.props.onRegistered(res.data.name);
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

        let registeredBtn = 'Suchen'
        let registered = ''
        let fullForm = ''
        if (this.state.registration){
            registeredBtn = 'Registrieren'
            registered = 
            <div>
                <p>Registrierung erfolgreich</p>
            </div>
            fullForm = 
            <div>
                <TextField fullWidth="true" label="Straße" name="street" variant="outlined" onChange={this.changeHandler} />
                            
                <label >Bitte neues Unternehmen anlegen</label><br></br>
                <TextField fullWidth="true" label="Straße" name="street" onChange={this.changeHandler} />
                <TextField fullWidth="true" label="Nummer" name="number" onChange={this.changeHandler} />
                <TextField fullWidth="true" label="PLZ" name="postcode" onChange={this.changeHandler} />
                <TextField fullWidth="true" label="Ort" name="city" onChange={this.changeHandler} />
                <TextField fullWidth="true" label="Land" name="name" onChange={this.changeHandler}>
                <MenuItem value={"Deutschland"}>{"name"}</MenuItem>)  </TextField>
            </div>
        }

        return <div id="RegistrationForm" style={{width: '60%', left: '20%', top: '15%', position: 'relative'}}>
            <form onSubmit={this.submitHandler} style={{position: 'relative', top: '20%'}}>
                <Card>
                <TextField fullWidth="true" label="Firmenname" name="name" onChange={this.changeHandler} />
                {fullForm}
                <button type="submit" id="search_company" class="button"><span>{registeredBtn}</span></button>
                </Card>
            </form>
          
        </div>
    }


}

export default RegistrationForm;