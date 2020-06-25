import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { CardContent, CardActions } from '@material-ui/core';

class RoleListItem extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.role_id,
            title: this.props.title,
            start_date: this.props.start_date,
            mode: this.props.mode,
            token: this.props.token,
            username: this.props.username
        }
        this.clickHandler=this.clickHandler.bind(this);
    }

    //Handle Click, if is leftbar: show more information, if rightbar: delete application
    clickHandler = (event) => {
        if(this.state.mode==="left")
            this.props.handleClick(this.state.id);
        else if(this.props.type==="f")
            axios.delete('http://localhost:80/api/Application/'+this.state.id+'/'+this.state.username+'/'+this.state.token)
            .then(res=>this.props.onChange())
            .catch(err => console.log(err))

    }


    render(){
        let delBtn = 'Mehr anzeigen'
        if(this.state.mode!=="left")
        delBtn = "Löschen"
        let date = ''
        if(this.state.start_date)
        date = <p>Start: </p>
        let t = <div onClick={this.clickHandler} style={{backgroundColor: 'gray'}}/>
        return (
            <Card style={{backgroundColor: "#F4B41A", marginBottom: 12, marginLeft: 5, marginRight: 5}}
            variant="outlined">
                <CardContent>
                    <Typography variant="h6" component="h6">
                        {this.state.title}
                    </Typography>
                    <Typography variant="caption" component="p">
                        Start: {moment(this.state.start_date).format('DD.MM.YYYY')}
                        <br></br>
                    </Typography >
                </CardContent>
                <CardActions>
                    <Button 
                    size="small"
                    onClick={this.clickHandler}
                    variant="outlined"
                    >
                        {delBtn}
                    </Button>
                </CardActions>
            </Card>
        )
        
        
    }
}
export default RoleListItem;