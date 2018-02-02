import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MealLists extends React.Component {

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
            let url = "/meals/edit/" + obj._id;
            let created = new Date(obj.date).toUTCString();
            return (
                <tr key={index}>
                    <td>{obj.mealname}</td>
                    <td>{obj.calorie}</td>
                    <td>{created}</td>
                    <td>
                        <Link to={url} className="btn-floating btn waves-effect waves-light red"><i className="material-icons">mode_edit</i></Link>&nbsp;&nbsp;
                        <a onClick={this.handleDelete} id={obj._id} className="btn-floating btn waves-effect waves-light red"><i className="material-icons" id={obj._id}>delete</i></a>
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
                          <th>Calorie</th>
                          <th>Created</th>
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

MealLists.propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func
};

MealLists.defaultProps = {
    data: [],
    onDelete: (id) => { console.error('onDelete is not defined'); }
};

export default MealLists;
