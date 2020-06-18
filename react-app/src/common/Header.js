import React, {Component} from 'react';
import logo from '../media/logo.png';
import Dropdown from 'react-bootstrap/Dropdown'
import 'js-cookie';

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: this.props.user //Cookies.get('Auth')
        }
        this.style = {
            position: 'absolute',
            width: '100%',
            left: '-0%',
            height: '5%',
            top: '0%',
            display: "flex", 
            flexDirection:"row", 
            background: "#F4B41A"
        }
        this.handleSettings=this.handleSettings.bind(this);
    }

    handleSettings(){
        this.props.onSettings();
    }


    render() {
        console.log(this.state)
        let greeting = ''
        if (this.state.user) greeting='Hallo '+this.state.user
        let menu = ''
        if (this.state.user) 
        menu = <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={this.handleSettings}>Settings</Dropdown.Item>
            <Dropdown.Item href="/">Logout</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
        return<header className="header" style={this.style}>
                <img src={logo} alt="logo" height='50%'/>
                <p>Freelane - Die Jobbörse</p>
                <p>{greeting}</p>
                <div>
                    {menu}
                </div>
            </header>
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({user: nextProps.user})
    }
}

export default Header;