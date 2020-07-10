import React, { Component, Fragment } from 'react';
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Alerts extends Component {

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if(error !== prevProps.error){
      if (error.msg.name) (alert.error(`Name: ${error.msg.name.join()}`))
      if (error.msg.email) (alert.error(`Email: ${error.msg.email.join()}`))
      if (error.msg.message) (alert.error(`Message: ${error.msg.message.join()}`))

      if(error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
      if(error.msg.username) alert.error(error.msg.username.join());
    }

    if(message !== prevProps.message) {
      if(message.Leadchanged) alert.success(message.Leadchanged);
      if(message.passwordNotMatch) alert.error(message.passwordNotMatch);
      if(message.Emailsent) alert.success(message.Emailsent);
      if(message.Emailerror) alert.error(message.Emailerror);
      if(message.passchanged) alert.success(message.passchanged);
      if(message.passerror) alert.error(message.passerror);
    }
  }

  render () {
    return(<Fragment />)
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts));
