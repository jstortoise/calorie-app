import React from 'react';
import { connect } from 'react-redux';
import { User } from '../components';
import { editUserRequest, searchUserRequest } from '../actions/user';

class UserEdit extends React.Component {

    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(username, password, calorie) {
        let id = this.props.match.params.id;
        return this.props.editUserRequest(id, username, password, calorie).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    Materialize.toast('Success!', 2000);
                    this.props.history.push('/users');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">NOT LOGGED IN</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <User mode={3} userId={this.props.match.params.id} onEdit={this.handleEdit}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.user.edit.status,
        errorCode: state.user.edit.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editUserRequest: (id, username, password, calorie) => {
            return dispatch(editUserRequest(id, username, password, calorie));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
