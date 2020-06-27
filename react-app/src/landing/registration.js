import React, {Component} from "react";
import Registration_form_freelancer from './registrationFormFreelancer';
import Registration_form_company from './registrationFormCompany';
import { Typography, CardContent, Card, CardHeader, Grid, Switch, Button } from "@material-ui/core";

class Registration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isCompany: false,
            stateSwitch: true
        }
    }
    handleBack = (event) => {
        this.props.onBack(true);
    }
    handleCompanyComplete = (event) => {
        this.props.onCompanyComplete(event);
    }
    switchToCompany = (event) => {
        this.setState({isCompany: true})
    }
    switchToFreelancer = (event) => {
        this.setState({isCompany: false})
    }
    handleToggleSwitch(){
        this.setState({stateSwitch: !this.state.stateSwitch})
        if(!this.state.stateSwitch) this.switchToFreelancer();
        else this.switchToCompany();
    }

    render() {
        let form = ''
        if(this.state.isCompany) form = <Registration_form_company  onRegistered={this.handleCompanyComplete}/>
        else form = <Registration_form_freelancer  onRegistered={this.handleBack}/>
        return (
            <Card>
                <CardHeader
                    title="Registrierung"
                    subheader="Erstelle ein neues Konto"
                    action={<Button onClick={this.props.onBack}>
                        Zurück
                    </Button>}
                />
                <CardContent style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyItems: "space-evenly"
                }}>
                    <Typography component="div">
                        <Card>
                            <CardHeader action={<Grid component="label" container spacing={1}>
                                    <Grid item>Unternehmen</Grid>
                                    <Grid item>
                                        <Switch color='primary'
                                            checked={this.state.stateSwitch}
                                            onChange={e => this.handleToggleSwitch()}
                                        />
                                    </Grid>
                                    <Grid item>Freelancer</Grid>
                                </Grid>}
                                />
                            <CardContent>
                                {form}
                            </CardContent>
                        </Card>
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default Registration