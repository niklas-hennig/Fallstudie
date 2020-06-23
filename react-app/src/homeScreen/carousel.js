import React, { Component } from 'react';
import axios from "axios";

import Slider from 'infinite-react-carousel';

import SlideProject from './slideProject'
import SlideRole from './slideRole';
import carousel from 'infinite-react-carousel/lib/carousel';

class CarouselComp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            type: this.props.type,
            token: this.props.token,

            all_role_ids: [],
            all_projects: [],

            updated: null,
            height: 0
        }
        this.style ={
            position: 'absolute',
            left: '15%',
            width: '70%',
            height: '100%'
        }
        this.handleSelectRole = this.handleSelectRole.bind(this);
        this.handleSelectProject=this.handleSelectProject.bind(this);
        this.handleProjektCreate=this.handleProjektCreate.bind(this);
        
    }
    getIds(){
        let projects = []
        if(this.state.type=='f'){
            axios.get('http://localhost:80/api/Role/'+this.state.username+'/f/'+this.state.token)
            .then(res => {
                let key = 0
                for (key in res.data){
                    projects.push(res.data[key].role_id)
                }
                this.setState({all_role_ids: projects})
            })
            .catch(err => console.error(err))
        }else{
            axios.get('http://localhost:80/api/Project/'+this.state.username+'/'+this.state.token)
            .then(res => {
                let key = 0
                for (key in res.data){
                    projects.push(res.data[key])
                }
                this.setState({all_projects: projects})
            })
        }
    }

    UNSAFE_componentWillMount(){
        this.getIds()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            username: this.props.username,
            type: this.props.type,
            token: this.props.token})
            this.getIds()
        
    }

    handleProjektCreate = (event) => {
        this.props.onProjectCreate();
    }

    handleSelectRole = (event) =>{
        this.props.onRoleSelect(event);
    }

    handleSelectProject = (event) =>{
        this.props.onProjectSelected(event)
    }


    render() {
        let carousel = ''
        let title = ''
        let create = ''
        if (this.state.type=='f') title="Ihre vorgeschlagenen Projekte"
        else {
            title="Ihre aktiven Projekte"
            create = <div>
                <button onClick={this.handleProjektCreate}>Neues Projekt erstellen</button>
            </div>
        }
        let settings = {
            dots: true,
            centerMode: true,
            centerPadding: 30,
        }
        if (this.state.all_role_ids.length>0){
            carousel =
            <Slider  {...settings}>
                {this.state.all_role_ids.map((id, index) => <SlideRole key={index} project={id} username={this.state.username} token={this.state.token} height={this.state.height} onSelect={this.handleSelectRole}></SlideRole>)}
            </Slider>
        }
        if(this.state.all_projects.length>0){
            carousel = 
            <Slider {...settings}>
                {this.state.all_projects.map((info, index) => <SlideProject key={index} project_id={info.project_id} title={info.titel} start_date={info.start_date} height={this.state.height} onSelect={this.handleSelectProject} ></SlideProject>)}
            </Slider>
        }
        if(this.state.type=='f'&&this.state.all_role_ids.length==0){
            carousel = 
            <div>
                <h2>Keine Projekte vorhanden</h2>
            </div>
        }
        if(this.state.type=="c"&&this.state.all_projects.length==0){
            carousel = 
            <div>
                <h1>Keine Projekte angelegt</h1>
            </div>
        }
    return (
        <div style={this.style}>
            <h1>{title}</h1>
            <div className="carousel_container" ref={ (divElement) => { this.divElement = divElement } } style={{height: '90%'}}>
                {carousel}
                {create}
            </div>
            
        </div>
    )
    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        this.setState({ height });
      }
}
export default CarouselComp;