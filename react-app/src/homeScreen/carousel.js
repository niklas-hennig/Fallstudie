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
            all_projects: []
        }
        this.style ={
            position: 'absolute',
            left: '15%',
            width: '70%',
            height: '100%'
        }
        this.handleSelectRole = this.handleSelectRole.bind(this);
        
    }
    getIds(){
        let projects = []
        if(this.state.type=='f'){
            axios.get('http://localhost:80/api/Role/'+this.state.username+'/f/'+this.state.token)
            .then(res => {
                let key = 0
                for (key in res.data){
                    projects.push(res.data[key].id)
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

    componentWillMount(){
        this.getIds()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            username: this.props.username,
            type: this.props.type,
            token: this.props.token})
    }

    handleSelectRole = (event) =>{
        this.props.onRoleSelect(event);
    }


    render() {
        console.log("car state:")
        console.log(this.state)
        let carousel = ''
        if (this.state.all_role_ids.length>0){
            carousel =
            <Slider dots adaptiveHeight={true}>
                {this.state.all_role_ids.map((id, index) => <SlideRole key={index} project={id} username={this.state.username} token={this.state.token} onSelect={this.handleSelectRole}></SlideRole>)}
            </Slider>
        }
        if(this.state.all_projects.length>0){
            carousel = 
            <Slider dots>
                {this.state.all_projects.map((info, index) => <SlideProject key={index} project_id={info.project_id} title={info.titel} start_date={info.start_date}></SlideProject>)}
            </Slider>
        }
    return (
        <div style={this.style}>
            <div>
                {carousel}
            </div>
        </div>
    )
    }

    componentDidMount() {
      }
}
export default CarouselComp;