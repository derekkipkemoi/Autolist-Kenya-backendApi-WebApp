import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

class SearchBar extends Component {

    state = { 
        inputValue: null
     } 

    searchBarHandler =(event)=> {
        console.log("Searchbar handle click", event.target.value)
        this.setState({
            inputValue: event.target.value
        })
    }

    onClickChangeHandler =(event)=> {
        event.preventDefault()
        const inputValue = this.state.inputValue
        if(inputValue !== null){   
            this.props.history.push(`/listcars/${inputValue}`);
        }  
    }

    render() { 
        const iconsStyle = {
            color: "#00544C",
            colorHover: "#25D366",
            Right: "5px",
          };
      
        return (

         
            <div class="rounded input-group mb-3">
            <input onChange={this.searchBarHandler.bind(this)} type="search" placeholder="Search by keyword..." aria-describedby="button-addon6" class="form-control"/>
            <div class="input-group-append">
              <button class="btn btn-custom btn-block text-centre font-weight-bold"
              onClick={this.onClickChangeHandler.bind(this)}
              //to={`/listcars/${this.state.selectedCarsMakeOptionValue}/${this.state.selectedCarsModelOptionValue}/${this.state.selectedCarsLocationOptionValue}/${this.state.selectedCarsYearMinOptionValue}/${this.state.selectedCarsYearMaxOptionValue}/${this.state.selectedCarsPriceMinOptionValue}/${this.state.selectedCarsPriceMaxOptionValue}`}
              >    
              <FontAwesomeIcon icon="search" style={iconsStyle} />
              Search
              </button>
            </div>
          </div>
          
         
        );
    }
}
 
export default SearchBar;