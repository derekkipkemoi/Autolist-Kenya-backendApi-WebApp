import React, { Component } from 'react';
import {connect} from 'react-redux'

export default (OriginalComponent) =>{
class MixedComponent extends Component {
    checkAuth(){
        if(!this.props.isAuthenticated && !this.props.jwtToken){
            this.props.history.push('/')
        }
    }

    componentDidMount(){
        this.checkAuth()
    }

    componentDidUpdate(){
        this.checkAuth()
    }

    render() { 
        return <OriginalComponent {...this.props}/>
    }
}

function mapStateToProps(state){
    return {
        isAuthenticated: state.auth.isAuthenticated,
        jwtToken:  state.auth.token
    }
}
 
return connect(mapStateToProps)(MixedComponent);
}