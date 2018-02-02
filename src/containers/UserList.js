import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listUserRequest, deleteUserRequest } from '../actions/user';
import { UserLists } from '../components';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    loadData() {
        this.props.listUserRequest().then(
            () => {
                if (this.props.listStatus === 'SUCCESS') {
                    console.log(this.props.data.length + ' data is loaded successfully');
                } else {
                    console.error('Failed to load data');
                }
            }
        )
    }

    handleDelete(id) {
        this.props.deleteUserRequest(id).then(
            () => {
                if (this.props.deleteStatus === 'SUCCESS') {
                    this.loadData();
                } else {
                    /*
                    DELETE MEAL: DELETE /api/user/delete
                    ERROR CODES
                        1: INVALID ID
                        2: NOT LOGGED IN
                        3: NO RESOURCE
                        4: PERMISSION FAILURE
                    */
                    let errorMessage = [
                        'Something broke',
                        'You are not logged in',
                        'That user does not exist',
                        'You do not have permission'
                    ];

                     // NOTIFY ERROR
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);


                    // IF NOT LOGGED IN, REFRESH THE PAGE
                    if(this.props.removeStatus.error === 2) {
                        setTimeout(()=> {location.reload(false);}, 2000);
                    }
                }
            }
        );
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div>
                <Link to="/users/create" className="waves-effect waves-light btn-large horizontal">Add User</Link>
                <UserLists data={this.props.data} onDelete={this.handleDelete}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listStatus: state.user.list.status,
        data: state.user.list.data,
        deleteStatus: state.user.delete.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listUserRequest: () => {
            return dispatch(listUserRequest());
        },
        deleteUserRequest: (id) => {
            return dispatch(deleteUserRequest(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
