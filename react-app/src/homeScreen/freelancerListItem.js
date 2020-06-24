import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardActions, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

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
            username: this.props.username,
            role_title: this.props.role_title
        }
        this.clickHandler=this.clickHandler.bind(this);
    }

    clickHandler = (event) => {
        console.log("delting state:")
        console.log(this.state)
        axios.delete('http://localhost:80/api/Application/'+this.state.id+'/'+this.state.freelancer_user+'/'+this.state.token)
        .then(res=>{
            this.props.onChange()})
        .catch(err => console.log(err))
            
    }


    render(){
        let t = <div style={{backgroundColor: 'gray'}}>
        <h3>{this.state.surname+' '+this.state.name}</h3>
        <a target="_blank" href={"http://localhost:80/api/File/"+this.state.freelancer_user}/>
        <button onClick={this.clickHandler}>Löschen</button>
        </div>
        return <Card
        variant="outlined"
        style={{backgroundColor: "#F4B41A", marginBottom: 12, marginLeft: 5, marginRight: 5}}
        >
            <CardContent>
                <Typography variant="h6" component="h6">
                    {this.state.surname+" "+this.state.name}
                </Typography>
                <Typography variant="caption" component="p">
                    Rolle: {this.state.role_title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                size="small"
                onClick={this.clickHandler}
                variant="outlined"
                >
                    Löschen
                </Button>
            </CardActions>            
        </Card>
    }
}
export default FreelancerListItem;