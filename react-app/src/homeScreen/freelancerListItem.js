import React, { Component } from 'react';
import axios from 'axios';

class FreelancerListItem extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.role_id,
            name: this.props.name,
            surname: this.props.surname,
            resume_link: this.props.resume_link,
            token: this.props.token,
            freelancer_user: this.props.freelancer_user,
            username: this.props.username
        }
        this.clickHandler=this.clickHandler.bind(this);
    }

    clickHandler = (event) => {
        axios.delete('http://localhost:80/api/Application/'+this.state.id+'/'+this.state.username+'/'+this.state.token)
        .then(res=>this.props.onChange())
        .catch(err => console.log(err))
            
    }


    render(){
        return <div style={{backgroundColor: 'gray'}}>
        <h3>{this.state.surname+' '+this.state.name}</h3>
        <a target="_blank" href={"http://localhost:80/api/File/"+this.state.freelancer_user}/>
        <button onClick={this.clickHandler}>Löschen</button>
        </div>
    }
}
export default FreelancerListItem;