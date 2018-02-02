import React from 'react';
import { connect } from 'react-redux';
import { User } from '../components';
import { registerRequest } from '../actions/user';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(username, password, calorie) {
        return this.props.registerRequest(username, password, calorie).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    Materialize.toast('Success! Please log in', 2000);
                    this.props.history.push('/login');
                    return true;
                } else {
                    /*
                        ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                    */
                    let errorMessage = [
                        'NOT LOGGED IN',
                        'Password is too short',
                        'Username already exists'
                    ];

                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <User mode={1} onRegister={this.handleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.user.register.status,
        errorCode: state.user.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (username, password, calorie) => {
            return dispatch(registerRequest(username, password, calorie));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
