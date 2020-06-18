import React, { Component } from 'react';
import axios from "axios";

class RoleCreationItem extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.id,
            prefences: this.props.prefences,
            title: '',
            description: '',
            requirements: '',
            payment: 0,
            area: this.props.prefences[0],
            numberOfFreeancers: 0
        }
        this.onChange=this.onChange.bind(this);
        
        if(this.props.prefences.lenght>0) this.props.onChange(this.state.id, "area", this.props.prefences[0]); 
    }

    onChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
        this.props.onChange(this.state.id, event.target.name, event.target.value);
    }

    onDelete = (event) =>{
        this.props.onDelete(this.state.id)
    }

    render(){
        console.log(this.state)
        return <tbody>
            <tr>
                <td><input type="text" name="title" onChange={this.onChange} autoComplete={this.state.title}/></td>
                <td><input type="text" name="description" onChange={this.onChange} autoComplete={this.state.description}/></td>
                <td><input type="text" name="requirements" onChange={this.onChange} autoComplete={this.state.requirements}/></td>
                <td><input type="number" name="payment" onChange={this.onChange} autoComplete={this.state.payment}/></td>
                <td><select  name="area" onChange={this.onChange}>
                        {this.state.prefences.map((prefence, index) => <option value={prefence} key={index}>{prefence}</option>)}
                    </select ></td>
                <td><button onClick={this.onDelete}>Löschen</button></td>
                <td><input type="number" name="numberOfFreeancers" onChange={this.onChange}/></td>
            </tr>
        </tbody>
    }

    componentWillReceiveProps(nextProps){
        console.log("received props")
        console.log(nextProps)
        this.props.onChange(this.state.id, "area", nextProps.prefences[0]);
        this.setState({prefences: nextProps.prefences, id: nextProps.id, area: nextProps.prefences[0]})
    }
}

export default RoleCreationItem;