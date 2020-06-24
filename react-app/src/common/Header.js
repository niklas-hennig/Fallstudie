import React, { Component } from 'react';
import logo from '../media/logo.png';
import Dropdown from 'react-bootstrap/Dropdown'

import 'js-cookie';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user, //Cookies.get('Auth')
            menu: false,
            anchor: null
        }
        this.style = {
            position: 'fixed',
            width: '100%',
            left: '-0%',
            height: '5%',
            top: '0%',
            display: "flex",
            flexDirection: "row",
            background: "#F4B41A",
            border: '#ffffff'
        }
        this.handleSettings = this.handleSettings.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);

    }

    handleSettings() {
        this.props.onSettings();
    }

    handleLogout() {
        window.localStorage.removeItem("auth")
        window.open('/', "_self")
    }

    handleOpenMenu =(event)=> {
        this.setState({ menu: true, anchor: event.currentTarget })
    }

    handleCloseMenu() {
        this.setState({ menu: false })
    }


    render() {
        let greeting = ''
        if (this.state.user) greeting = 'Hallo ' + this.state.user

        let menu = ''
        if (this.state.user) {
            menu = <React.Fragment>
                <MenuRoundedIcon onClick={this.handleOpenMenu}>
                </MenuRoundedIcon>
                <Menu
                    id="simple-menu"
                    keepMounted
                    open={Boolean(this.state.menu)}
                    onClose={this.handleCloseMenu}
                    anchorEl={this.state.anchor}
                >
                    <MenuItem onClick={this.handleSettings}>Profil</MenuItem>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
            </React.Fragment>

        }
        return <React.Fragment>
            <AppBar position="static" style={{backgroundColor: "#F4B41A"}}>
                <Toolbar>
                    <Typography style={{ flex: 1 }}>
                        Freelane - Die Jobbörse
                        </Typography>
                    <Typography style={{ flex: 1 }}>
                        {greeting}
                    </Typography>
                    {menu}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ user: nextProps.user })
        let t = <img src={logo} alt="logo" maxHeight='50px' />
    }
}

export default Header;