import React, { Component } from 'react';

class Carousel extends Component {
    constructor(props){
        super(props);
        this.style ={
            position: 'absolute',
            left: '15%',
            width: '70%',
            height: '100%'
        }
    }
    render(){
        return <div style={this.style}>
            <p>Ihre top Projekte</p>
        </div>
    }
}
export default Carousel;