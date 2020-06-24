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
        this.style={
            backgroundColor: '#143D59',
            fontFamily: 'Verdana',
            fontSize: '10px'
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
        let t = <div className="footer" style={this.style}>
        <nav>
            <table id="navigation_footer">
                <tbody>
                    <tr>
                        <td><a href="/about.html">Über uns</a></td>
                        <td><a href="/impressum.html" >Impressum</a></td>
                        <td><a href="html\datenschutz.html">Datenschutzhinweise</a></td>
                    </tr>
                </tbody>
            </table>
        </nav>
    </div>
        return (
            <BottomNavigation
            value={this.state.selected}
            style={{
                width: '100%',
                flex: 1,
                flexDirection: "row",
                justifyContent: 'space-between',
                position: "fixed",
                bottom: 0,
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