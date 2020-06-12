import React, {Component} from "react";
import axios from "axios";

class CompleteProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        let fill = ''
        if (this.props.isFreelancerSetting){
            fill = 'ja'
        }else{
            fill = 'nein'
        }
    return <p>ich bin eine Vervollständigung für Freelancer: {fill}</p>
    }
}

export default CompleteProfile;