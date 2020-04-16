import React, {Component} from "react";
import RegistrationForm from './registrationForm';

class Registration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isCompany: false
        }
        this.styleDefault = {marginRight: "5%",
        backgroundColor: "#D9D9D9",
        position: "absolute",
        width: "40%",
        height: '80%',
        textAlign: "center",
        left: '55%',
        top: '10%',
        borderRadius: '200px'
        }
        this.bottomStyle = {
            position: 'relative',
            top: '20%'
        }
    }
    handleBack = (event) => {
        this.props.onBack(true);
    }
    switchToCompany = (event) => {
        this.setState({isCompany: true})
    }
    switchToFreelancer = (event) => {
        this.setState({isCompany: false})
    }

    render() {
        return <div style={this.styleDefault}>
                    <div id='top' style={{position:'relative', top:'-3%', left:'20%'}}>
                        <button type="button" id="button_selbststaendiger" onClick={this.switchToFreelancer}>Selbstständiger</button>
                        <button type="button" id="button_unternehmen" onClick={this.switchToCompany}>Unternehmen </button>
                    </div>
                    <RegistrationForm isCompany={this.state.isCompany} onRegistered={this.handleBack}/>
                    <div id='BackBar' style={this.bottomStyle}>
                        <button type="button" id="back" onClick={this.handleBack}>Zurück</button>
                    </div>
            
                </div>
    }
}

export default Registration