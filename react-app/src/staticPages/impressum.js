import React, { Component } from 'react';
import Header from "../common/Header";
import Footer from "../common/Footer";

class Impressum extends Component {
    render() {
        return <div>
            <Header />
            <h1>Impressum</h1>
            <h2 class="content">Betreiber der Website</h2>
            <p><strong>Muster SE</strong><br />
                Musterstraße 30<br />
                20354 Frankfurt<br />
                Deutschland<br />
                Tel.: +49 12 345 678-12<br />
                Fax: +49 12 345 678-13<br />
                E-Mail: info@freelane.com</p>

            <h2 class="content">Haftungshinweis</h2>
            <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der
            verlinkten Seiten sind ausschließlich <br /> deren Betreiber verantwortlich.</p>

            <h2 class="content">Geschäftsführer:</h2>
            <p>Siham Abulzahab <br /> Dennis Burkhard <br /> Niklas Hennig <br /> Vanessa Stutz</p>
            <Footer />
        </div>


    }
}
export default Impressum;