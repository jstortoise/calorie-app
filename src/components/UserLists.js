import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class UserLists extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        let id = e.target.id;
        this.props.onDelete(id);
    }

    render() {
        let lists = this.props.data.map((obj, index) => {
            let url = "/users/edit/" + obj._id;
            return (
                <tr key={index}>
                    <td>{obj.username}</td>
                    <td>{obj.password}</td>
                    <td>{obj.calorie}</td>
                    <td>{obj.role === 1 ? 'Admin' : ''}</td>
                    <td>
                        <Link to={url} className="btn-floating btn waves-effect waves-light red"><i className="material-icons">mode_edit</i></Link>&nbsp;&nbsp;
                        <a onClick={this.handleDelete} className="btn-floating btn waves-effect waves-light red"><i className="material-icons" id={obj._id}>delete</i></a>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <table className="striped centered">
                    <thead>
                      <tr>
                          <th>Name</th>
                          <th>Password</th>
                          <th>Calorie</th>
                          <th>Role</th>
                          <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                        {lists}
                    </tbody>
                </table>
            </div>
        );
    }
}

UserLists.propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func
};

UserLists.defaultProps = {
    data: [],
    onDelete: (id) => { console.error('onDelete is not defined'); }
};

export default UserLists;
