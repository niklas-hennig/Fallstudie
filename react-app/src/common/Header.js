import React, {Component} from 'react';
import logo from '../media/logo.png';
import 'js-cookie';

class Header extends Component {
    constructor(){
        super()
        this.state = {
            Auth: 'Test' //Cookies.get('Auth')
        }
        this.style = {
            position: 'absolute',
            width: '100%',
            left: '-0%',
            height: '3%',
            top: '0%',
            display: "flex", 
            flexDirection:"row", 
            background: "#F4B41A"
        }
    }
    componentDidMount(){
    }

    render() {
        return(
            <header className="header" style={this.style}>
                <img src={logo} height='50%'/>
                <p>Freelane - Die Jobbörse  Hallo {this.state.Auth}</p>
            </header>
        )
    }
}

export default Header;