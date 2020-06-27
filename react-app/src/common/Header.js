import React, { Component } from 'react';
import logo from '../media/logo_freelane.png';

import { AppBar, Toolbar, Typography, Menu, MenuItem, Avatar } from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user, //Cookies.get('Auth')
            menu: false,
            anchor: null
        }
        this.handleSettings = this.handleSettings.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);

    }

    //halder to open screens accoring to user Selection
    handleSettings() {
        this.handleCloseMenu();
        this.props.onSettings();
    }

    //Authentification is currently only handled through local storage, so logout is deleting this entry and reloading the site
    handleLogout() {
        this.handleCloseMenu();
        window.localStorage.removeItem("auth")
        window.open('/', "_self")
    }

    handleOpenMenu =(event)=> {
        this.setState({ menu: true, anchor: event.currentTarget })
    }

    handleCloseMenu() {
        this.setState({ menu: false })
    }


    //greeting and menu only show up after login
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
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Avatar src={logo}/>
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
    }
}

export default Header;