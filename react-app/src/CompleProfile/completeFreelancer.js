import React, { Component } from "react";
import axios from "axios";


class CompleteProfileFreelancer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            email: this.props.email,
            name: this.props.name,
            surname: this.props.surname,
            gender: this.props.gender,
            date_of_birth: this.props.date_of_birth,
            street: this.props.street,
            number: this.props.number,
            postcode: this.props.postcode,
            city: this.props.city,
            country: this.props.country,
            resume_link: null,
            iban: this.props.iban,
            ktn_owner: this.props.ktn_owner,
            experience: this.props.experience,
            is_set: "true",
            prefences_available: [],
            prefence: null,
            datei: null,
            token: this.props.token,
            isChange: this.props.isChange,

            showUploadBtn: true
        }
        this.uploadHandler = this.uploadHandler.bind(this);
    }
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    fileHandler = event => {
        console.log(event.target.files[0])
        this.setState({ datei: event.target.files[0] })
    }

    uploadHandler = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('file', this.state.datei)
        axios.post('http://localhost:80/api/File/' + this.state.username + '/' + this.state.token, data, {

        }).then(res => {
            console.log(res)
            this.setState({ showUploadBtn: false })
        })
            .catch(err => console.log(err))
    }

    fetchPrefences() {
        let pref = []
        let key = ''
        axios.get('http://localhost:80/api/Prefence/')
            .then(res => {
                for (key in res.data) {
                    pref.push(res.data[key]['pref_name'])
                }
                this.setState({ prefences_available: pref, prefence: pref[0] })

            })
    }

    submitHandler = (event) => {
        event.preventDefault();

        axios.put('http://localhost:80/api/User/Freelancer', {
            username: this.props.username,
            date_of_birth: this.state.date_of_birth,
            street: this.state.street,
            number: this.state.number,
            postcode: this.state.postcode,
            city: this.state.city,
            country: this.state.country,
            resume_link: this.state.resume_link,
            iban: this.state.iban,
            ktn_owner: this.state.ktn_owner,
            experience: this.state.experience,
            is_set: this.state.is_set
        }).then(res => {
            axios.put('http://localhost:80/api/Prefence/' + this.state.username, {
                prefence: this.state.prefence
            }).then(this.props.onSubmit('f'))
                .catch(err => console.error(err))

        })
    }

    UNSAFE_componentWillMount() {
        this.fetchPrefences()
    }

    render() {
        let anrede = "Lieber"
        if (this.props.gender === 'f') {
            anrede = 'Liebe'
        } if (this.props.gender === 'd') {
            anrede = 'Hallo'
        }
        let disable = ''
        if (!this.state.isChange) disable = 'disabled'

        let uploadBtn = 'Hochladen erfolgreich'
        if (this.state.showUploadBtn === true) uploadBtn = <button onClick={this.uploadHandler}>Hochladen</button>

        return (
            <div>
                <h2>{anrede} {this.props.surname} {this.props.name}, vervollständige doch dein Profil um gefunden zu werden</h2>
                <div class="completeProfileBox">
                    <form id="completeFreelancer" onSubmit={this.submitHandler}>
                        <div id="personal">Persönliches<br />
                            <input type="text" {...disable} name={this.state.name} placeholder={this.props.name} /><br />
                            <input type="text" {...disable} name={this.state.surname} placeholder={this.props.surname} /><br />
                            <input type="date" name="date_of_birth" placeholder={this.state.date_of_birth} onChange={this.changeHandler} required /><br />
                        </div><br />

                        <div id="address">Adresse<br />
                            <input type="text" name="street" placeholder={this.state.street} onChange={this.changeHandler} required /><br />
                            <input type="number" name="number" placeholder={this.state.number} onChange={this.changeHandler} required /><br />
                            <input type="number" name="postcode" placeholder={this.state.postcode} onChange={this.changeHandler} required /><br />
                            <input type="text" name="city" placeholder={this.state.city} onChange={this.changeHandler} required />
                            <input type="text" name="country" onChange={this.changeHandler} />
                        </div><br />

                        <div id="banking">Bankdaten<br />
                            <input type="text" name="iban" placeholder={this.state.iban} onChange={this.changeHandler} /><br />
                            <input type="text" name="ktn_owner" placeholder={this.state.ktn_owner} onChange={this.changeHandler} />
                        </div><br />

                        <div id="details">Details<br />
                            <textarea rows="10" cols="50" name="experience" placeholder={this.state.experience} onChange={this.changeHandler} /><br />
                            <span>Wählen Sie eine oder mehrere Kategorien für die Sie sich interessieren</span><br />
                            <select name="prefence" onChange={this.changeHandler}>
                                {this.state.prefences_available.map((name) => <option key={name}>{name}</option>)}
                            </select>
                            <span>Laden Sie ihren Lebenslauf hier hoch</span><br />
                            <input name="datei" type="file" size="50" onChange={this.fileHandler} /><br />
                            {uploadBtn}
                        </div>
                        <button type="submit">Speichern</button>
                    </form>
                </div>
            </div>
        );
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log("recieving props")
        console.log(nextProps)
        this.setState({
            username: nextProps.username,
            email: nextProps.email,
            name: nextProps.name,
            surname: nextProps.surname,
            gender: nextProps.gender,
            date_of_birth: nextProps.date_of_birth,
            street: nextProps.street,
            number: nextProps.number,
            postcode: nextProps.postcode,
            city: nextProps.city,
            country: nextProps.country,
            //resume_link: null,
            iban: nextProps.iban,
            ktn_owner: nextProps.ktn_owner,
            experience: nextProps.experience
        })
    }
}


export default CompleteProfileFreelancer;