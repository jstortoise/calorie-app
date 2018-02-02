import React from 'react';
import { connect } from 'react-redux';
import { User } from '../components';
import { loginRequest } from '../actions/user';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    let loginData = {
                        isLoggedIn: true,
                        isAdmin: this.props.isAdmin,
                        calorie: this.props.calorie,
                        username: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    Materialize.toast('Welcome ' + id + '!', 2000);
                    this.props.history.push('/meals');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <User mode={0} onLogin={this.handleLogin}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.user.login.status,
        isAdmin: state.user.status.isAdmin,
        calorie: state.user.status.calorie
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
