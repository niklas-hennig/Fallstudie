import React, {Component} from "react";
import axios from "axios";

import CompleteProfileFreelancer from './completeFreelancer';
import CompleteProfileCompany from './completeCompany';
import RightBar from "../homeScreen/rightBar";

class CompleteProfile extends Component{
    constructor(props){
        super(props)
        if(this.props.isFreelancerSetting) {
            this.state = {
                //Both
                street: null,
                number: null,
                postcode: null,
                city: null,
                country: null,
                token: this.props.token,
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
                //Both
                street: null,
                number: null,
                postcode: null,
                city: null,
                country: null,
                //Company
                comp_id: null,
                comp_name: this.props.comp_name,
                tel_no: null,
                street_bill: null,
                number_bill: null,
                postcode_bill: null,
                city_bill: null,
                description: null,
                username: this.props.username
            }

        } 
        this.style={
            marginTop: "2%",
            marginBottom: "75px"
        }
        this.handleSubmit = this.handleSubmit.bind(this);    
        this.handleBack=this.handleBack.bind(this);  

    }

    handleSubmit(type){
        this.props.onSubmit();
    }

    handleBack(){
        this.props.onBack();
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
            axios.get('http://localhost:80/api/Company/'+ this.state.comp_name)
            .then(data => {
                this.setState({
                    name: data.data['name'],
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
                <div style={this.style}>
                    <CompleteProfileFreelancer isChange={this.props.isChange} token={this.state.token} username={this.state.username} email={this.state.email} name={this.state.name} surname={this.state.surname} gender={this.state.gender} date_of_birth={this.state.date_of_birth} street={this.state.street} number={this.state.number} postcode={this.state.postcode} city={this.state.city} country={this.state.country} iban={this.state.iban} ktn_owner={this.state.ktn_owner} experience={this.state.experience} onBack={this.handleBack} onSubmit={this.handleSubmit}/>
                </div>
                );
        }else{
            console.log(this.state)
            return (
                <div style={this.style}>
                    <CompleteProfileCompany username={this.state.username} tel_no={this.state.tel_no} description={this.state.description} isChange={this.props.isChange} comp_id={this.state.comp_id} comp_name={this.state.comp_name} street={this.state.street} number={this.state.number} postcode={this.state.postcode} city={this.state.city} country={this.state.country} street_bill={this.state.street_bill} number_bill={this.state.number_bill} city_bill={this.state.city_bill} postcode_bill={this.state.postcode_bill} onBack={this.handleBack} onSubmit={this.handleSubmit}/>
                </div>
                );
        }
    }
}





export default CompleteProfile;