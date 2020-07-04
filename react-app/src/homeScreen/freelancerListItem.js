import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardActions, Button, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

class FreelancerListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.role_id,
            name: this.props.name,
            surname: this.props.surname,
            resume_link: this.props.resume_link,
            token: this.props.token,
            freelancer_user: this.props.freelancer_user,
            username: this.props.username,
            role_title: this.props.role_title
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    //Send appliation request to backend and return if call succeded
    clickHandler = (event) => {
        axios.delete('http://localhost:80/api/Applications/' + this.state.id + '/' + this.state.freelancer_user + '/' + this.state.token)
            .then(res => {
                this.props.onChange()
            })
            .catch(err => console.log(err))

    }


    render() {
        let LnkResume = ''
        if (this.state.resume_link) LnkResume = <Link href={"http://localhost:80/api/Files/" + this.state.freelancer_user} target="_blank">
            Lebenslauf
            </Link>
        return <Card
            variant="elevation"
            style={{ backgroundColor: "#F4B41A", marginBottom: 12, marginLeft: 5, marginRight: 5 }}
        >
            <CardContent>
                <Typography variant="h6" component="h6">
                    {this.state.surname + " " + this.state.name}
                </Typography>
                <Typography variant="caption" component="p">
                    Rolle: {this.state.role_title}
                </Typography>
                {LnkResume}
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={this.clickHandler}
                    variant="contained"
                    color="primary"
                >
                    Löschen
                </Button>
            </CardActions>
        </Card>
    }
}
export default FreelancerListItem;