import React, { Component } from 'react';
import axios from "axios";

class SlideProject extends Component {
    constructor(props){
        super(props)
        this.state={
            project_id : this.props.project_id,
            title: this.props.title,
            start_date: this.props.start_date
        }
        this.fetchProjectInfo=this.fetchProjectInfo.bind(this);
    }

    fetchProjectInfo(){
        console.log(this.state.project_id)
        axios.get('http://localhost:80/api/Project/ID/1/j/j')
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.error(err))
    }

    clickHandler = (event) => {
        this.props.onSelect(this.state.project_id)
    }

    render(){
        console.log('Project slide state:')
        console.log(this.state)
        return <div onClick={this.clickHandler} style={{ flex: '0 0 100%', backgroundColor: 'gray', width: '100%' }}>
            <p>Titel: {this.state.title}</p><br />
            <p>Start: {this.state.start_date}</p>
        </div>
    }

    componentDidMount(){
        this.fetchProjectInfo();
    }
}

export default SlideProject;