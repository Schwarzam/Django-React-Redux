import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

export class Login extends Component {
  state = {
    username: '',
    password: '',
    loading: false
  };

  static propTypes= {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  onSubmit= e =>{
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  };


  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render () {
    if (this.props.isAuthenticated){
      return <Redirect to="/" />;
    }
    const { username, password, loading } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>

            <div className="form-group">
              <label>Username</label>
              <input
                type="username"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading && (<i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }}/>)}
                {!loading && <span>Login</span>}
              </button>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <p>
              Forgot password? <Link to="/passreset">Reset Password</Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
