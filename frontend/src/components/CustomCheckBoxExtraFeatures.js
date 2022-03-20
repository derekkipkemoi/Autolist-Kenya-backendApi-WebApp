import React, { Component } from 'react';

class CustomCheckBoxExtraFeatures extends Component {
    state = { 
        name: "",
        isChecked: true
     }
     toggleChange = () => {
         this.setState({
             isChecked: !this.state.isChecked,
         });
     }
    render() { 
        return ( 
                <div>
                    <input
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    className="custom-control-input"
                    type={this.props.type}
                    value = {this.name}
                    checked={!this.state.isChecked}
                    onChange={this.toggleChange} />
                   <label className="text-dark cursor-pointer d-block custom-control-label" htmlFor={this.props.id}>{this.props.label}</label> 
            </div>
         );
    }
}
 
export default CustomCheckBoxExtraFeatures;