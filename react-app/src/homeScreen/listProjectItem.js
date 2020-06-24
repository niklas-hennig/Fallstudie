import React, { Component } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { CardContent, CardActions } from '@material-ui/core';

class ListProjectItem extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.project_id,
            title: this.props.title,
            start_date: this.props.start_date,
            end_date: this.props.end_date
        }
        this.clickHandler=this.clickHandler.bind(this);
    }

    clickHandler = (event) => {
        this.props.handleClick(this.state.id);
    }


    render(){
        let date = ''
        if(this.state.start_date)
        date = <p>Start: {this.state.start_date.substring(8,10)}.{this.state.start_date.substring(5,7)}.{this.state.start_date.substring(0,4)}</p>
        let t = <div onClick={this.clickHandler} style={{backgroundColor: 'gray'}}>
        <h3>{this.state.title}</h3>
        {date}
        </div>
        return (
            <Card  
            variant="outlined"
            style={{backgroundColor: "#F4B41A", marginBottom: 12, marginLeft: 5, marginRight: 5}}
            >
                <CardContent>
                    <Typography variant="h6" component="h6">
                        {this.state.title}
                    </Typography>
                    <Typography variant="caption" component="p">
                        Start: {this.state.start_date.substring(8,10)}.{this.state.start_date.substring(5,7)}.{this.state.start_date.substring(0,4)}
                        <br></br>
                    </Typography >
                    <Typography variant="caption" component="p">
                        Ende: {this.state.end_date.substring(8,10)}.{this.state.end_date.substring(5,7)}.{this.state.end_date.substring(0,4)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                    size="small"
                    onClick={this.clickHandler}
                    variant="outlined"
                    >
                        Mehr anzeigen
                    </Button>
                </CardActions>
            </Card>
        )
    }
}
export default ListProjectItem;