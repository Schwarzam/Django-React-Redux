import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner'

const PrivateRoute = ({ component: Component, auth, ...rest }) =>(
  <Route
  {...rest}
  render={props => {
    if(auth.isLoading){
      return (<Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={3000} />)

    }else if(!auth.isAuthenticated) {
      return (
          <Redirect to="/login" />);
    }else{
    return <Component{...props}/>;
  }
  }}
    />
);

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
