import React, { Component } from 'react';
import axios from "axios";

class ProjectDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            project_id: this.props.project_id
        }
    }
    render(){
        return <div>
            <p>Ich informiere über Projekt: {this.state.project_id}</p>
        </div>
    }
}

export default ProjectDetail;