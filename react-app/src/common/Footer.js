import React, { Component } from 'react';
import { Navbar, Nav}  from 'react-bootstrap';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';

class Footer extends Component {
    constructor(){
        super()
        this.state={
            selected: null
        }
        this.sites={
            0: "about",
            1: "impressum",
            2: "datenschutz"
        }
        this.onChange=this.onChange.bind(this);
    }

    onChange = (event, newValue) =>{
        window.open("/"+this.sites[newValue]+".html", '_self');
    }

    render() {
        return (
            <BottomNavigation
            value={this.state.selected}
            style={{
                width: '100%',
                flex: 1,
                flexDirection: "row",
                justifyContent: 'space-between',
                position: "fixed",
                bottom: 0
              }}
            showLabels
            onChange={this.onChange}
            >
                <BottomNavigationAction label="Über uns" icon={<InfoRoundedIcon/>}></BottomNavigationAction>
                <BottomNavigationAction label="Impressum" icon={<DescriptionRoundedIcon/>}></BottomNavigationAction>
                <BottomNavigationAction label="Datenschutz" icon={<LockOpenRoundedIcon/>}></BottomNavigationAction>

            </BottomNavigation>
          );
    }
}



export default Footer;