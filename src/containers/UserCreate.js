import React from 'react';
import { connect } from 'react-redux';
import { User } from '../components';
import { registerRequest } from '../actions/user';

class UserCreate extends React.Component {

    constructor(props) {
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleCreate(username, password, calorie) {
        return this.props.registerRequest(username, password, calorie).then(
            () => {
                if (this.props.status === "SUCCESS") {
                    Materialize.toast('Success! Please login', 2000);
                    this.props.history.push('/users');
                    return true;
                } else {
                    let errorMessage = [
                        'Invalid Uername',
                        'Password is too short',
                        'Username already exist'
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
                <User mode={2} onRegister={this.handleCreate}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
