import React, { Component } from 'react';

class CustomCheckBoxCommonFeatures extends Component {
    state = { 
        isChecked: true,
        value:""
     }
     toggleChange = (event) => {
         this.setState({
             value: event.target.label,
         });
        // this.props.onChangeFeature(event.target.label)
     }
    render() { 
        return ( 
                <div>
                    <input
                    id={this.props.id}
                    label={this.props.label}
                    className="custom-control-input"
                    type={this.props.type}
                    value = {this.props.id}
                    checked={this.state.isChecked}
                    onChange={this.toggleChange} />
                   <label className="text-dark cursor-pointer d-block custom-control-label" htmlFor={this.props.id}>{this.props.label}</label> 
            </div>
         );
    }
}
 
export default CustomCheckBoxCommonFeatures;