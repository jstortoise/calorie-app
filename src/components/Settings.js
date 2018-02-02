import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/user';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            calorie: this.props.calorie
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSetting = this.handleSetting.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSetting() {
        let calorie = this.state.calorie;

        this.props.onSetting(calorie).then(
            (success) => {
                if(!success) {
                    this.setState({
                        calorie: this.props.calorie
                    });
                }
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
                        caloire: 0
                    });

                    document.cookie = 'key=' + btoa(JSON.stringify(this.state));

                    // and notify
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);
                } else {
                    this.setState({
                        calorie: this.props.status.calorie
                    })
                }
            }
        );
    }

    render() {
        return (
            <div className="container">
                <div className="input-field col">
                    <label className="active">Daily calorie Amount</label>
                    <input type="number" name="calorie" value={this.state.calorie} onChange={this.handleChange}/>
                    <a onClick={this.handleSetting} className="waves-effect waves-light btn">UPDATE</a>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    onSetting: PropTypes.func,
    calorie: PropTypes.number
};

Settings.defaultProps = {
    calorie: 0,
    onSetting: (calorie) => { console.error("onSetting not defined"); }
};

const mapStateToProps = (state) => {
    return {
        status: state.user.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
