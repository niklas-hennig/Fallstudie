import React, { Component } from 'react';
import { Navbar, Nav}  from 'react-bootstrap';

class Footer extends Component {
    constructor(){
        super()
        this.style={
            height: '10%',
            top: '90%',
            position: 'fixed',
            backgroundColor: '#143D59',
            left: '-1%',
            width: '100%',
            fontFamily: 'Verdana',
            fontSize: '10px'
        }
    }

    render() {
        return (
            <div className="footer" style={this.style}>
            <nav>
                <table id="navigation_footer">
                    <tbody>
                        <tr>
                            <td><a href="/about.html">Über uns</a></td>
                            <td><a href="/impressum.html" >Impressum</a></td>
                            <td><a href="html\datenschutz.html">Datenschutzhinweise</a></td>
                            <td><a href="html\kontakt.html">Kontakt</a></td>
                        </tr>
                    </tbody>
                </table>
            </nav>
        </div>
          );
    }
}



export default Footer;