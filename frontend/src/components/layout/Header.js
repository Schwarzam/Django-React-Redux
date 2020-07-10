// https://orktes.github.io/atom-react/
import { Link } from 'react-router-dom';
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from '../../actions/auth';

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
            <a className="nav-link" href="#"> Home <span className="sr-only">(current)</span></a>
          </li>
        <li className="nav-item">
          <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">Logout</button>
          </li>
      </ul>
    );


    const guestLinks = (

        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="#"> Home <span className="sr-only">(current)</span></a>
              </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
              </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
              </li>
              </ul>

    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Projeto</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  <div className="collapse navbar-collapse" id="navbarText">

              { isAuthenticated ? authLinks : guestLinks}

      <span className="navbar-text">
      {user ? `hello ${user.username}` : ''}
    </span>
  </div>
</nav>

    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(Header);
