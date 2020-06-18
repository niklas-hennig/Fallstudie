import React, { Component } from 'react';
import axios from "axios";

class ProjectCreate extends Component {
    constructor(props){
        super(props)
        this.state={
            username: null,

        }
        this.style ={
            position: 'absolute',
            left: '15%',
            width: '70%',
            height: '100%'
        }
    }

    
    
    render(){
        return <div style={this.style}>
            Ich erstelle ein Projekt
        </div>
    }
}

export default ProjectCreate;