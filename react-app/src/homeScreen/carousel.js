import React, { Component } from 'react';
import axios from "axios";

import Slider from 'infinite-react-carousel';

import SlideProject from './slideProject'
import SlideRole from './slideRole';
import carousel from 'infinite-react-carousel/lib/carousel';
import { Grid, Button } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

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
        this.handleSelectRole = this.handleSelectRole.bind(this);
        this.handleSelectProject=this.handleSelectProject.bind(this);
        this.handleProjektCreate=this.handleProjektCreate.bind(this);
        
    }

    //Fetching Information to display on the slider
    getIds(){
        let projects = []
        if(this.state.type==='f'){
            axios.get('http://localhost:80/api/Roles/'+this.state.username+'/f/'+this.state.token)
            .then(res => {
                let key = 0
                for (key in res.data){
                    projects.push(res.data[key].role_id)
                }
                this.setState({all_role_ids: projects})
            })
            .catch(err => console.error(err))
        }else{
            axios.get('http://localhost:80/api/Projects/Active/'+this.state.username+'/'+this.state.token)
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

    //refreshing for updated unformation
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            username: this.props.username,
            type: this.props.type,
            token: this.props.token})
            this.getIds()
        
    }

    //Pass on call to switch to view on selected operation
    handleProjektCreate = (event) => {
        this.props.onProjectCreate();
    }

    handleSelectRole = (event) =>{
        this.props.onRoleSelect(event, true);
    }

    handleSelectProject = (event) =>{
        this.props.onProjectSelected(event)
    }


    //Handle Slider Creation for all posibiliis, freelancer/company and no items available
    render() {
        let carousel = ''
        let title = ''
        let create = ''
        if (this.state.type==='f') title="Projektvorschläge"
        else {
            title="Ihre aktiven Projekte"
            create = <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddCircleRoundedIcon />}
            onClick={this.handleProjektCreate}
            >
                Neues Projekt
            </Button>
        }
        let settings = {
            dots: true,
            centerMode: true,
            centerPadding: 0,
            arrowsBlock: false,
            autoplay: true
        }
        if (this.state.all_role_ids.length>0){
            carousel =
            <Slider  {...settings}>
                {this.state.all_role_ids.map((id, index) => <SlideRole key={id} project={id} username={this.state.username} token={this.state.token} height={this.state.height} onSelect={this.handleSelectRole}></SlideRole>)}
            </Slider>
        }
        if(this.state.all_projects.length>0){
            carousel = <React.Fragment>
                    <Slider {...settings}>
                        {this.state.all_projects.map((info, index) => <SlideProject key={info.project_id} project_id={info.project_id} title={info.titel} start_date={info.start_date} app_limit={info.application_limit} height={this.state.height} comp_name={info.name} onSelect={this.handleSelectProject} ></SlideProject>)}
                    </Slider>
            </React.Fragment>
        }
        if(this.state.type==='f'&&this.state.all_role_ids.length==0){
            carousel = 
            <div>
                <h2>Keine Projekte vorhanden</h2>
            </div>
        }
        if(this.state.type=="c"&&this.state.all_projects.length==0){
            carousel = 
            <div>
                <h1>Keine Projekte ausstehend</h1>
            </div>
        }
    return (
        <div >
            <h1>{title}</h1>
            <div className="carousel_container" ref={ (divElement) => { this.divElement = divElement } }>
                {carousel}
                {create}
            </div>
            
        </div>
    )
    }
}
export default CarouselComp;