import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { passtoken } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

export class Passtoken extends Component {
  state = {
    newpassword: '',
    token: '',
  };

  static propTypes= {
  }

  onSubmit= e =>{
    e.preventDefault();
    this.props.passtoken(this.state.newpassword, this.state.token);
}

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render () {
    const { message } = this.props;
    if(message.passchanged) return <Redirect to='/' />;

    const { newpassword, token } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Reset Password</h2>
          <form onSubmit={this.onSubmit}>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="newpassword"
                className="form-control"
                name="newpassword"
                onChange={this.onChange}
                value={newpassword}
              />
            </div>
            <div className="form-group">
              <label>Token</label>
              <input
                type="token"
                className="form-control"
                name="token"
                onChange={this.onChange}
                value={token}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.messages
});

export default connect(mapStateToProps, { passtoken })(Passtoken);
