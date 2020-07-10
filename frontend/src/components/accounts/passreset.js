import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { passreset } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

export class Passreset extends Component {
  state = {
    email: '',
    loading: false
  };

  static propTypes= {
  }

  onSubmit= e =>{
    e.preventDefault();
    this.props.passreset(this.state.email)
    this.setState({ loading: true });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render () {
    const { message } = this.props;
    if(message.Emailsent) return <Redirect to='/Passtoken' />;

    const { email, loading } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Reset Password</h2>
          <form onSubmit={this.onSubmit}>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" onClick={this.loadingwheel} disabled={loading}>
                {loading && (<i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }}/>)}
                {loading && <span>Sending...</span>}
                {!loading && <span>Send email</span>}
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

export default connect(mapStateToProps, { passreset })(Passreset);
