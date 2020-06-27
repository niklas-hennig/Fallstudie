import React, {Component} from "react";
import '../style.css';

class Description extends Component {
    constructor() {
        super()
        this.style = {
            marginLeft: '2.5%',
            marginTop: '2.5%',
            backgroundColor: "#D9D9D9",
            borderRadius: '50px',
            textAlign: 'justify',
            float: 'left'
        }
    }


    render () {
        return (<div id='descriptionContainer'>
                   
                    <div id="beschreibung">
                        <p>Lorem ipsum dolor sit amet, ceteros adversarium est ad, ei inani movet quaerendum vim. Ea rebum facilisis eam, eam ea amet alii iudicabit. 
                            Ne sea audiam luptatum similique. Molestiae splendide repudiandae mei et, sit in quodsi omittam. Vocibus aliquando nec cu.
                            Ne vim veri essent indoctum, eos habemus qualisque scripserit cu, sea stet disputationi no. No molestie consectetuer vix, 
                            blandit neglegentur ei usu. Splendide conceptam at vim. Mei discere debitis te. Discere eleifend forensibus in cum, cum te iudicabit accusamus.
                            Vix cu natum putent, pro no dicit menandri. Sapientem dissentias nec ad, mea ne ferri epicurei. Solum singulis mel an. Te omittam sententiae eos, 
                            tractatos vituperata ex qui. Nec invenire definitiones ut, cu has nominati mandamus adolescens.
                        </p>
                    </div>
                </div>)
    }
}
export default Description;