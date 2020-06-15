import React, { Component } from 'react';
import axios from "axios";

class SlideRole extends Component {
    constructor(props){
        super(props)
        this.state={
            //Project Info
            project_id: this.props.project,
            titel: null,
            description: null,
            requirements: null,
            payment: null,
            //Credentials
            username: this.props.username,
            token: this.props.token
        }
        this.clickHandler=this.clickHandler.bind(this);
        this.fetchProjectInfo=this.fetchProjectInfo.bind(this);
    }

    fetchProjectInfo(project_id){
        axios.get('http://localhost:80/api/Role/'+this.state.project_id+'/'+this.state.token)
        .then(res=>{
            this.setState({titel: res.data[0].titel, description: res.data[0].description, requirements: res.data[0].requirements, payment: res.data[0].payment})
        })
        .catch(err => console.error(err))
    }

    clickHandler = (event) => {
        this.props.onSelect(this.state.project_id)
    }

    componentDidMount(){
        this.fetchProjectInfo(this.state.project_id)
    }

    render(){
        return <div onClick={this.clickHandler} style={{ backgroundColor: 'gray' }}>
            <p>Titel: {this.state.titel}</p><br />
            <p>description: {this.state.description}</p>
            <p>Bezahlung: {this.state.payment}</p>
        </div>
    }
}

export default SlideRole;