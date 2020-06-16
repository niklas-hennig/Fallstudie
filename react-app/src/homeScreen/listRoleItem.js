import React, { Component } from 'react';

class RoleListItem extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.role_id,
            title: this.props.title,
            start_date: this.props.start_date
        }
        this.clickHandler=this.clickHandler.bind(this);
    }

    clickHandler = (event) => {
        if(this.props.handleClick)
            this.props.handleClick(this.state.id);
    }


    render(){
        let date = ''
        if(this.state.start_date)
        date = <p>Start: {this.state.start_date.substring(8,10)}.{this.state.start_date.substring(5,7)}.{this.state.start_date.substring(0,4)}</p>
        return <div onClick={this.clickHandler} style={{backgroundColor: 'gray'}}>
        <h3>{this.state.title}</h3>
        {date}
        </div>
    }
}
export default RoleListItem;