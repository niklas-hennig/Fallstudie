import React, { Component } from 'react';
import axios from "axios";
import { Typography, Button } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core'

class SlideRole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //Project Info
            project_id: this.props.project,
            title: null,
            description: null,
            requirements: null,
            payment: null,
            //Credentials
            username: this.props.username,
            token: this.props.token
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.fetchProjectInfo = this.fetchProjectInfo.bind(this);
    }

    //Fill state with specific information to display
    fetchProjectInfo(project_id) {
        if (project_id > 0) {
            axios.get('http://localhost:80/api/Role/' + project_id + '/' + this.state.token)
                .then(res => {
                    this.setState({ title: res.data[0].title, description: res.data[0].description, requirements: res.data[0].requirements, payment: res.data[0].payment })
                })
                .catch(err => console.error(err))
        } else {
            this.setState({ title: null, description: null, requirements: null, payment: null })
        }
    }

    //Call for switching to view more information
    clickHandler = (event) => {
        this.props.onSelect(this.state.project_id)
    }

    componentDidMount() {
        this.fetchProjectInfo(this.state.project_id)
    }

    render() {
        let content = ''
        if (this.state.title) {
            content = <Card
                variant="outlined"
            >
                <CardHeader title={"Titel: " + this.state.title} />
                <CardContent>
                    <Typography variant="caption" component="p">
                        {this.state.description}
                    </Typography>
                    <Typography variant="caption" component="p">
                        Bezahlung: {this.state.payment}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="outlined"
                        onClick={this.clickHandler}
                    >
                        Anzeigen
                    </Button>
                </CardActions>
            </Card>
        } else {
            content = <Card>
                <CardContent>
                    <Typography>Leider haben wir keine neuen Projekte für Sie</Typography>
                </CardContent>
            </Card>
        }
        return content
    }
}

export default SlideRole;