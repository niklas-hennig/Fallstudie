import React, {Component} from "react";
import axios from 'axios';

class PasswordReset extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: this.props.username,
            type: this.props.type,
            isRequest: true
        }
        this.handleReqest=this.handleReqest.bind(this);
        this.handleReset=this.handleReset.bind(this);
    }

    handleReqest (){

    }

    handleReset(){

    }

    render(){
        let btn = ''
        if(this.state.isRequest) btn=<button onClick={this.handleReqest}>Anfrage senden</button>
        else btn=<button onClick={this.handleReset}>Passwort zurücksetzen</button>
        return <div>
            Ich setzte Passwörter zurück
            {btn}
        </div>
    }
}
export default PasswordReset;