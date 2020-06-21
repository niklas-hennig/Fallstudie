import React, {Component} from "react";
import axios from 'axios';

class PasswordReset extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            type: "f",

            token: "",
            password: "",
            isRequest: true
        }
        this.styleDefault = {marginRight: "5%",
                            backgroundColor: "#D9D9D9",
                            position: "absolute",
                            width: "40%",
                            height: '60%',
                            textAlign: "center",
                            left: '55%',
                            top: '10%',
                            borderRadius: '200px'
                            }
        this.handleReqest=this.handleReqest.bind(this);
        this.handleReset=this.handleReset.bind(this);
        this.changeHandler=this.changeHandler.bind(this);
    }

    handleReqest=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:80/api/User/Password/'+this.state.username+'/'+this.state.type)
        .then(res => {
            this.setState({isRequest: false})
        })
        .catch(err => console.error(err))
        
    }

    handleReset=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:80/api/User/Password/'+this.state.username+'/'+this.state.type+'/'+this.state.token+'/'+this.state.password)
        .then(res => this.props.onBack())
        .catch(err => console.error(err))
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        let form = ''
        if(this.state.isRequest) {
            form = <form onSubmit={this.handleReqest}>
                <label htmlFor="username">Bitte Nutzernamen eingeben</label>
                <input name="username" type="text" placeholder="Nutzername" onChange={this.changeHandler}/>
                <label htmlFor="type">Bitte wählen Sie Ihren Kontotyp aus</label>
                <select name="type" onChange={this.changeHandler}>
                    <option value="f">Freelancer</option>
                    <option value="c">Unternehmen</option>
                </select>
                <button type="submit">Anfrage senden</button>
            </form>
        }
        else {
            form = <form onSubmit={this.handleReset}>
                <label htmlFor="username">Bitte Nutzernamen eingeben</label>
                <input name="username" type="text" placeholder="Nutzername" onChange={this.changeHandler}/>
                <label htmlFor="token">Bitte Token eingeben</label>
                <input name="token" type="number" placeholder="Token" onChange={this.changeHandler}/>
                <label htmlFor="password">Bitte neues Passwort eingeben</label>
                <input name="password" type="password" placeholder="Passwort" onChange={this.changeHandler}/>
                <button type="submit">Passwort zurücksetzen</button>
            </form>
        }
        return <div style={this.styleDefault}>
            {form}
        </div>
    }
}
export default PasswordReset;