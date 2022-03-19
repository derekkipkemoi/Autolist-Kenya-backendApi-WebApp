import React, { Component } from 'react';


class CustomInput extends Component {
    state = { 
        name: ""
     }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state.name)
    };
    render() { 
        
        return ( 
            <div>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input
                    name = {this.props.name}
                    id = {this.props.id}
                    minLength = "1"
                    maxLength = "20"
                    placeholder = {this.props.placeholder}
                    className="form-control text-dark"
                    type={this.props.type}
                    value = {this.name}
                    onChange = {this.changeHandler}
                    required />
            </div>
         );
    }
}
export default CustomInput;