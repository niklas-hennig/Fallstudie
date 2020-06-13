import React, {Component} from "react";
import axios from "axios";

class CompleteProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    static defaultProps = {name: ""}

    componentDidMount() {
        this.setState({name: this.props.userinfo})
        /*comp_id / name / getanfrage datenbank*/ 
    }

    render(){
        if (this.props.isFreelancerSetting){
            return (
                <div>
                    <p>Profilvervollständigung für Freelancer</p>
                    <CompleteProfileFreelancer name={this.props.name}/>
                </div>
                );
        }else{
            return (
                <div>
                    <p>Profilvervollständigung für Unternehmen</p>
                    <CompleteProfileCompany name={this.props.name}/>
                </div>
                );
        }
    }
}

class CompleteProfileFreelancer extends React.Component {
    render() {
        return(
            <div>
                <h2>Lieber {this.props.name}, vervollständige doch dein Profil um gefunden zu werden</h2>
                <div class="completeProfileBox">
                    
                    <div id="personal">Persönliches<br />
                        <input type="text" name="name" placeholder="Name"/><br />
                        <input type="text" name="surname" placeholder="Vorname"/><br />
                        <input type="date" name="date_of_birth" placeholder="Geburtsdatum"/><br />
                    </div><br />

                    <div id="address">Adresse<br />
                        <input type="text" name="street" placeholder="Straße"/><br />
                        <input type="number" name="number" placeholder="Hausnummer"/><br />
                        <input type="number" name="postcode" placeholder="Postleitzahl"/><br />
                        <input type="text" name="city" placeholder="Stadt"/>
                    </div><br />

                    <div id="banking">Bankdaten<br />
                        <input type="number" name="iban" placeholder="IBAN"/><br />
                        <input type="text" name="ktn_owner" placeholder="Kontoinhaber"/>
                    </div><br />

                    <div id="details">Details<br />
                        <textarea rows="10" cols="50" name="experience" placeholder="Schreiben Sie etwas über sich"/><br />
                        <span>Wählen Sie eine oder mehrere Kategorien für die Sie sich interessieren</span><br />
                        <input type="checkbox" name="category" value="graphicdesigner"/>Grafikdesigner
                        <input type="checkbox" name="category" value="programmer"/>Programmierer
                        <input type="checkbox" name="category" value="mechanic"/>Mechaniker  
                        <br /><br />                              
                        <span>Laden Sie ihren Lebenslauf hier hoch</span><br />
                        <input name="datei" type="file" size="50" accept="text/*" /><br />
                        <button>Hochladen</button><br />
                    </div>
                </div>
            </div>
        );
    }
}

class CompleteProfileCompany extends React.Component {
    render() {
        return(
            <div>
                <h2>Lieber Firma {this.props.name}, vervollständige doch dein Profil um gefunden zu werden</h2>
                <div class="completeProfileBox">                    
                    <div id="deliveryAddress">Lieferadresse<br />
                        <input type="text" name="street" placeholder="Straße"/><br />
                        <input type="number" name="number" placeholder="Hausnummer"/><br />
                        <input type="number" name="postcode" placeholder="Postleitzahl"/><br />
                        <input type="text" name="city" placeholder="Stadt"/><br />
                        <input type="number" name="tel_no" placeholder="Telefonnummer"/>
                    </div><br />

                    <div id="bill_address">Zahlungsaddresse<br />
                        <input type="checkbox" name="paymentAddressSameAsDelivery" />Zahlungsaddresse identisch zu Lieferadresse<br /><br />
                        <input type="text" name="bill_street" placeholder="Straße"/><br />
                        <input type="number" name="bill_number" placeholder="Hausnummer"/><br />
                        <input type="number" name="bill_postcode" placeholder="Postleitzahl"/><br />
                        <input type="text" name="bill_city" placeholder="Stadt"/>
                        <input type="number" name="bill_tel_no" placeholder="Telefonnummer"/>
                    </div><br />                    

                    <div id="banking">Bankdaten<br />
                        <input type="number" name="iban" placeholder="IBAN"/><br />
                        <input type="text" name="ktn_owner" placeholder="Kontoinhaber"/>
                    </div><br />

                    <div id="details">Details<br />
                        <textarea rows="10" cols="50" name="description" placeholder="Schreiben Sie etwas über sich"/><br />                            
                        <span>Laden Sie ihr Firmenlogo hoch</span><br />
                        <input name="datei" type="file" size="50" accept="text/*" /><br />
                        <button>Hochladen</button><br />
                    </div>
                </div>
            </div>
        );
    }
}

export default CompleteProfile;