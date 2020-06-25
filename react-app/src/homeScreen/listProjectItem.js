import React, { Component } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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

    //Handle switch to Project view
    clickHandler = (event) => {
        this.props.handleClick(this.state.id);
    }


    render(){
        let startTxt = ''
        let endTxt = ''
        if(this.state.start_date)
        startTxt = moment(this.state.start_date).format('DD.MM.YYYY')
        if(this.state.end_date)
        endTxt = moment(this.state.end_date).format('DD.MM.YYYY')
        return (
            <Card  
            variant="elevation"
            style={{backgroundColor: "#F4B41A", marginBottom: 12, marginLeft: 5, marginRight: 5}}
            >
                <CardContent>
                    <Typography variant="h6" component="h6">
                        {this.state.title}
                    </Typography>
                    <Typography variant="caption" component="p">
                        Start: {startTxt}
                        <br></br>
                    </Typography >
                    <Typography variant="caption" component="p">
                        Ende: {endTxt}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                    size="small"
                    onClick={this.clickHandler}
                    variant="contained"
                    color="primary"
                    >
                        Mehr anzeigen
                    </Button>
                </CardActions>
            </Card>
        )
    }
}
export default ListProjectItem;