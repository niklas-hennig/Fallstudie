import React, { Component } from 'react';

class RightBar extends Component {
    constructor(props){
        super(props);
        this.style = {
            position: 'absolute',
            width: '15%',
            left: '85%',
            height: '100%',
            backgroundColor: '#F4B41A',
        }
    }
    render(){
        return <div style={this.style}>
            <p>right</p>
        </div>
    }
}
export default RightBar;