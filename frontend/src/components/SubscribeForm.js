import React, { Component } from 'react';
import {reduxForm} from 'redux-form'
import {compose} from 'redux'



class SubscribeForm extends Component {
    onSubmit = async (formData) => {      
        await this.props.signUp(formData)
    }
    render() { 
        return (
            <section className="home-newsletter">
            <div className="container">
            <div className="row">
            <div className="col-sm-12">
                <div className="single font-weight-bold">
                    <h6>Subscribe to our Newsletter</h6>
                    <div className="input-group">
                        <input type="email" className="form-control" placeholder="Enter your email"/>
                        <span className="input-group-btn">
                        <button className="btn btn-custom btn-block text-dark text-centre font-weight-bold" type="submit">SUBSCRIBE</button>
                        </span>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </section>
            
         );
    }
}
 
export default compose(
    reduxForm({form:'subscribeForm'})
)(SubscribeForm)
 
