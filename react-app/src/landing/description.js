import React, {Component} from "react";
import '../style.css';

class Description extends Component {
    constructor() {
        super()
        this.style = {
            width: '50%',
            marginLeft: '2.5%',
            marginTop: '2.5%',
            height: '50%',
            backgroundColor: "#D9D9D9",
            borderRadius: '50px',
            textAlign: 'justify',
            overflow: 'hidden',
            float: 'left'
        }
    }


    render () {
        return (<div id='descriptionContainer' style={this.style}>
                    <h1>Herzlich Willkommen bei <strong>Freelane</strong></h1>
                    <div id="beschreibung">
                        <p>Lorem ipsum dolor sit amet, ceteros adversarium est ad, ei inani movet quaerendum vim. Ea rebum facilisis eam, eam ea amet alii iudicabit. 
                            Ne sea audiam luptatum similique. Molestiae splendide repudiandae mei et, sit in quodsi omittam. Vocibus aliquando nec cu.
                            Ne vim veri essent indoctum, eos habemus qualisque scripserit cu, sea stet disputationi no. No molestie consectetuer vix, 
                            blandit neglegentur ei usu. Splendide conceptam at vim. Mei discere debitis te. Discere eleifend forensibus in cum, cum te iudicabit accusamus.
                            Vix cu natum putent, pro no dicit menandri. Sapientem dissentias nec ad, mea ne ferri epicurei. Solum singulis mel an. Te omittam sententiae eos, 
                            tractatos vituperata ex qui. Nec invenire definitiones ut, cu has nominati mandamus adolescens.
                            Illum clita iriure an nam, ius in prodesset dissentiunt. Aeque putant inciderint nec eu, te eloquentiam definitiones eam, 
                            est vidit discere similique ex. Has te reque intellegebat, purto splendide an vim. Eu dolorem graecis facilisi vim, sea ei dicam animal. 
                            Perpetua complectitur signiferumque id per, his ne enim primis possit.
                        </p>
                    </div>
                </div>)
    }
}
export default Description;