import React, { Component } from 'react';

class CustomTextArea extends Component {
    state = {
        name: ""
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() { 
      
        return ( 
            <div>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <textarea
                    name ={this.props.name}
                    id ={this.props.id}
                    rows ="4"
                    minLength ="50"
                    maxLength ="600"
                    placeholder = {this.props.placeholder}
                    className="form-control text-dark"
                    type={this.props.type}
                    value = {this.name}
                    onChange = {this.changeHandler}
                    required/>
            </div>
         );
            
    }
}
 
export default CustomTextArea;