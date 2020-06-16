import React, { Component } from 'react';
import axios from 'axios';

class RoleListItem extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.role_id,
            title: this.props.title,
            start_date: this.props.start_date,
            mode: this.props.mode,
            token: this.props.token,
            username: this.props.username
        }
        this.clickHandler=this.clickHandler.bind(this);
    }

    clickHandler = (event) => {
        if(this.state.mode=="left")
            this.props.handleClick(this.state.id);
        else
            axios.delete('http://localhost:80/api/Application/'+this.state.id+'/'+this.state.username+'/'+this.state.token)
            .then(res=>this.props.onChange())
            .catch(err => console.log(err))
    }


    render(){
        console.log("listItem state:")
        console.log(this.state)
        let delBtn = ''
        if(this.state.mode!="left")
        delBtn = <button onClick={this.clickHandler}>Löschen</button>
        let date = ''
        if(this.state.start_date)
        date = <p>Start: {this.state.start_date.substring(8,10)}.{this.state.start_date.substring(5,7)}.{this.state.start_date.substring(0,4)}</p>
        return <div onClick={this.clickHandler} style={{backgroundColor: 'gray'}}>
        <h3>{this.state.title}</h3>
        {date}
        {delBtn}
        </div>
    }
}
export default RoleListItem;