import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { priceFormat } from '../NumberFormat'; 
import { numberFormat } from '../NumberFormat';
import Carousel from 'nuka-carousel';

class SellerCarCard extends Component {
    
    state ={
        editCarName: null
    }

    EditCarDetails =(car)=>{
        this.setState({
            editCarName: car.name
        })
    }


    
    render() { 
      const car = this.props.car
      const imageStyle = {
        width: '100%',
        height: '15rem',
        objectFit: 'cover'
    }
       const buttonStyle = {
         margin: "2px"
       }

        return ( 
           
         <div className="row">
            <div className="card mt-3 w-100" style={{margin:"5px"}}>
           <div className="row no-gutters">
            <div className="col-sm-5" style={{background: "#868e96"}}>
               
               

                <Carousel>
              {car.images.map((image, i)=> (
                  <img className="card-img" src={image} alt="Card" style={imageStyle}/>
              ))}
              </Carousel>
            </div>
            <div className="col-sm-7 col-md-7">
                 <Link to={`/vehicle/${car._id}`} className="text-dark" style={{ textDecoration: 'none' }}>
                <div className="card-body">
                    <h5 className="card-title font-weight-bold">{car.name}</h5>
                    <h5 className="card-title font-weight-bold" style={{color: "#25D366"}}>{priceFormat(car.price)} <span className="font-weight-bold" style={{fontSize:"14px",color:"#ffa010"}}>{car.priceNegotiable ?"Negotiable" : null}</span></h5>
                    <h5 className="card-title font-weight-bold" style={{fontSize:"15px"}}><FontAwesomeIcon icon="map-marker-alt" style={iconsStyle} />{car.location}</h5>
                    <p className="card-title"  style={{fontSize:"15px"}}><span> <img style={svgImageStyle} alt="Clock" src={require('../assets/svgs/gauge.svg')} />{numberFormat(car.mileage)} Km |</span><span> <img style={svgImageStyle} src={require('../assets/svgs/new-product.svg')} alt="..."/>{car.condition}|</span><span> <img style={svgImageStyle} src={require('../assets/svgs/color.svg')} alt="..."/>{car.color}|</span><span> <img style={svgImageStyle} alt="Clock" src={require('../assets/svgs/gear_box.svg')} />{car.transmission}</span></p>
                
 
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.EditCarDetails.bind(this,this.props.car)} data-whatever="@mdo">Edit Car</button>
                    <button type="button" className="btn btn-warning" style={buttonStyle}>Sell Faster</button>
                    <button type="button" className="btn btn-dark" style={buttonStyle}>Mark as Sold</button>
                    <button type="button" className="btn btn-danger" style={buttonStyle}>Delete Car</button>
                </div>
                </Link>

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">{this.state.editCarName}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">Hallo</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                    <div class="form-group">
                                        <label for="recipient-name" class="col-form-label">Recipient:</label>
                                        <input type="text" class="form-control" id="recipient-name"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Message:</label>
                                        <textarea class="form-control" id="message-text"></textarea>
                                    </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Send message</button>
                                </div>
                                </div>
                            </div>
                            </div> 
            </div>
        </div>
        </div>
    </div>);
    }
}

 
export default SellerCarCard;