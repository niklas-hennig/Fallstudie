import React, { Component } from 'react';

class SlideProject extends Component {
    constructor(props){
        super(props)
        this.state={
            project_id : this.props.project_id,
            title: this.props.title,
            start_date: this.props.start_date
        }
    }

    //fetching not possible due to concurrency in calls to backend endig up querying the same endpoint

    clickHandler = (event) => {
        this.props.onSelect(this.state.project_id)
    }

    render(){
        let content = ''
        if (this.state.title){
            content = 
            <div onClick={this.clickHandler} style={{ flex: '0 0 100%', backgroundColor: 'gray', width: '80%', marginLeft: '10%', height: this.props.height }}>
                <p>Titel: {this.state.title}</p><br />
                <p>Start: {this.state.start_date}</p>
            </div>
        }else{
            content = 
            <div style={{ flex: '0 0 100%', backgroundColor: 'gray', width: '80%', marginLeft: '10%', height: this.props.height }}>
                <p>Bisher noch keine Projekte vorhanden</p><br />
                <p></p>
            </div>
        }
        console.log('Project slide state:')
        console.log(this.state)
        return content
    }

    componentDidMount(){
        //this.fetchProjectInfo();
    }
}

export default SlideProject;