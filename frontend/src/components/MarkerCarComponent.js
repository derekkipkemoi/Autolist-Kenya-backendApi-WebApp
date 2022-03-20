import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as actions from '../actions'

class MarketCarComponent extends Component {
    state = {  }

    render() { 
        const mystyle = {
            marginTop: "70px"
        }
        const iconsStyle = {
            color: "#00544C",
            marginRight: "10px",
            colorHover: "#25D366"
        }
        return ( 
            <div className="container" style={mystyle}>
                <div className="row">
                <div className="col-md-10">
                <div className="card">
                <h5 className="card-title text-center font-weight-bold">Select Your Package</h5>
                <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-6">                  
                    <label>
                    <input type="radio" name="product" className="card-input-element"  checked/>
                        <div className="panel panel-default card-input">
                        <div className="card text-white bg-warning">
                            <div className="card-header font-weight-bold">Gold Package</div>
                            <div className="card-body">
                                <h5 className="card-title">Ksh 3,000 (VAT Includes)</h5>
                                <p className="card-text">- Sell 100 Times Faster</p>
                                <p className="card-text">- Get Listed in Our Top Social Media Platforms Pages</p>
                                <p className="card-text">- Listed Online For 30 Days</p> 
                            </div>
                            </div>
                        </div>
                    </label>
                    
                </div>

                 <div class="col-md-6 col-lg-6 col-sm-6">
                    <label>
                    <input type="radio" name="product" className="card-input-element"/>
                        <div className="panel panel-default card-input">
                        <div className="card text-white bg-dark">
                            <div className="card-header font-weight-bold">Silver Package</div>
                            <div className="card-body">
                                <h5 className="card-title">Ksh 1,500 (VAT Includes)</h5>
                                <p className="card-text"> Sell 50 Times Faster</p>
                                <p className="card-text">- Get Featured in Moti Cars Kenya Web and Android App</p>
                                <p className="card-text">- Listed Online For 30 Days</p>  
                            </div>
                            </div>
                        </div>
                    </label>    
                </div>
                </div>
                </div>
                <div className="row">
                

                <div className="col-md-6 col-lg-6 col-sm-6">
                <h6>- Go to M-pesa </h6>
                <h6>- Select Lipa Na M-pesa</h6>
                <h6>- Select Buy Goods and Services</h6>
                <h6>- Enter Till Number 5204479</h6>
                <h6>- Enter Amount As Per Your Selected Package Above</h6>
                <h6>- Wait For Confirmation Message</h6>
                </div>
                </div>
                <Link className="mx-auto btn btn-custom btn-block text-centre font-weight-bold" role="button" to="/dashboard"><FontAwesomeIcon icon="arrow-right" style={iconsStyle}/>Post as Free Ad</Link>
                </div>

                <aside className="col-md-2 blog-sidebar">
                    <div className="p-3 mb-3 bg-dark text-light rounded">
                        <h6 className="font-italic">Ad Section</h6>
                        <p className="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                    </div>
                    </aside>
                </div>
                
            </div>
         );
    }
}

function mapStateToProps(state) {
    return {
        message: state.auth.message
    }
}
 
export default 
    connect(mapStateToProps, actions)
    (MarketCarComponent)