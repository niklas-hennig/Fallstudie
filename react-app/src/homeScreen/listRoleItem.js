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
        let t = <div onClick={this.clickHandler} style={{backgroundColor: 'gray'}}/>
        let dateMmt = moment(this.state.start_date)
        if(this.state.mode!=="left") dateMmt.subtract(10, 'days')
        console.log(this.state.start_date)
        console.log(dateMmt)
        return (
            <Card style={{backgroundColor: "#F4B41A", marginBottom: 12, marginLeft: 5, marginRight: 5}}
            variant="elevation">
                <CardContent>
                    <Typography variant="h6" component="h6">
                        {this.state.title}
                    </Typography>
                    <Typography variant="caption" component="p">
                        Start: {dateMmt.format('DD.MM.YYYY')}
                        <br></br>
                    </Typography >
                </CardContent>
                <CardActions>
                    <Button 
                    size="small"
                    onClick={this.clickHandler}
                    variant="contained"
                    color="primary"
                    >
                        {delBtn}
                    </Button>
                </CardActions>
            </Card>
        )
        
        
    }
}
export default RoleListItem;