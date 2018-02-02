import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listMealRequest, deleteMealRequest } from '../actions/meal';
import { MealLists } from '../components';

class MealList extends React.Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    loadData() {
        this.props.listMealRequest().then(
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
        this.props.deleteMealRequest(id).then(
            () => {
                if (this.props.deleteStatus === 'SUCCESS') {
                    this.loadData();
                } else {
                    /*
                    DELETE MEAL: DELETE /api/meal/delete
                    ERROR CODES
                        1: INVALID ID
                        2: NOT LOGGED IN
                        3: NO RESOURCE
                        4: PERMISSION FAILURE
                    */
                    let errorMessage = [
                        'Something broke',
                        'You are not logged in',
                        'That meal does not exist',
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
                <Link to="/meals/create" className="waves-effect waves-light btn-large horizontal">Add Meal</Link>
                <MealLists data={this.props.data} onDelete={this.handleDelete}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listStatus: state.meal.list.status,
        data: state.meal.list.data,
        deleteStatus: state.meal.delete.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listMealRequest: () => {
            return dispatch(listMealRequest());
        },
        deleteMealRequest: (id) => {
            return dispatch(deleteMealRequest(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealList);
