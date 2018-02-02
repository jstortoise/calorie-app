import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/user';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isAdmin: false,
            caloire: 0,
            username: ''
        };
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logoutRequest().then(
            () => {
                Materialize.toast('Good Bye!', 2000);

                 // EMPTIES THE SESSION
                this.setState({
                    isLoggedIn: false,
                    isAdmin: false,
                    caloire: 0,
                    username: ''
                });

                document.cookie = 'key=' + btoa(JSON.stringify(this.state));
            }
        );
    }

    componentDidMount() {
        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length >= 2) return parts.pop().split(";").shift();
        }

        // get login data from cookie
        let loginData = getCookie('key');

        // if loginData is undefined, do nothing
        if(typeof loginData === "undefined") return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));
        // if not logged in, do nothing
        if(!loginData.isLoggedIn) {
            return;
        }

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                if (!this.props.status.valid) {
                    // if session is not valid
                    // logout the session
                    this.setState({
                        isLoggedIn: false,
                        isAdmin: false,
                        caloire: 0,
                        username: ''
                    });

                    document.cookie = 'key=' + btoa(JSON.stringify(this.state));

                    // and notify
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);
                } else {
                    this.setState({
                        isLoggedIn: this.props.status.isLoggedIn,
                        isAdmin: this.props.status.isAdmin,
                        calorie: this.props.status.calorie,
                        username: this.props.status.username
                    })
                }
            }
        );

    }

    render() {
        const loginButton = (
            <li>
                <Link to="/login"><i className="material-icons">vpn_key</i></Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.onLogout}><i className="material-icons">lock_open</i></a>
            </li>
        );

        const usersItem = (
            <li><Link to="/users">Users</Link></li>
        )

        let color = 'green';
        if (this.props.totalCalorie > this.props.status.calorie) {
            color = 'red';
        }

        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-1">
                        <Link to="/" className="brand-logo">CalorieApp</Link>
                        <div className="right">
                            <span className={color}>Expected Daily Calories: { this.props.status.calorie }</span>
                            <ul className="right hide-on-med-and-down">
                                { this.props.status.isAdmin ? usersItem : ''}
                                <li><Link to="/meals">Meals</Link></li>
                                <li><Link to="/setting">Setting</Link></li>
                                { this.props.status.isLoggedIn ? logoutButton : loginButton }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.user.status,
        totalCalorie: state.meal.totalCalorie
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
