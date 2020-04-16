import React, { Component } from 'react';

class LeftBar extends Component {
    constructor(props){
        super(props);
        this.style = {
            position: 'absolute',
            width: '15%',
            height: '100%',
            backgroundColor: '#F4B41A',
        }
    }
    render(){
        return <div style={this.style}>
            <p>left</p>
        </div>
    }
}
export default LeftBar;