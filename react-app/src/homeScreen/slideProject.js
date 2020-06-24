import React, { Component } from 'react';
import { Card, CardHeader, Avatar, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
class SlideProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project_id: this.props.project_id,
            title: this.props.title,
            start_date: this.props.start_date,
            app_limit: this.props.app_limit,
            comp_name: this.props.comp_name
        }
    }

    //fetching not possible due to concurrency in calls to backend endig up querying the same endpoint

    clickHandler = (event) => {
        this.props.onSelect(this.state.project_id)
    }

    render() {
        let t = <div onClick={this.clickHandler} style={{  backgroundColor: 'gray', marginLeft: '10%', height: this.props.height * 0.65 }}>
            <p>Titel: {this.state.title}</p><br />
            <p>Start: {this.state.start_date}</p>
        </div>
        let content = ''
        if (this.state.title) {
            content = <Card
            variant="outlined">
                <CardHeader avatar={
                    <Avatar aria-label="recipe" style={{backgroundColor: "#D6D6D6"}}>
                        {this.state.comp_name[0].toUpperCase()}
                    </Avatar>}
                    title={this.state.title}
                    subheader={"Start: "+moment(this.state.start_date).format('DD.MM.YYYY')}
                >
                </CardHeader>
                <CardContent>
                    <Typography>
                        Bewerbungsschluss: {moment(this.state.app_limit).format('DD.MM.YYYY')}
                    </Typography>
                </CardContent>
            </Card>

        } else {
            content =
                <div style={{ flex: '0 0 100%', backgroundColor: 'gray', width: '80%', marginLeft: '10%', height: this.props.height }}>
                    <p>Bisher noch keine Projekte vorhanden</p><br />
                    <p></p>
                </div>
        }
        return content
    }

    componentDidMount() {
        //this.fetchProjectInfo();
    }
}

export default SlideProject;