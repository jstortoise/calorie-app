import React from 'react';
import { connect } from 'react-redux';
import { Meal } from '../components';
import { editMealRequest, searchMealRequest } from '../actions/meal';

class MealEdit extends React.Component {

    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(mealname, calorie) {
        let id = this.props.match.params.id;
        return this.props.editMealRequest(id, mealname, calorie).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    Materialize.toast('Success!', 2000);
                    this.props.history.push('/meals');
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
                <Meal mode={true} mealId={this.props.match.params.id} onEdit={this.handleEdit}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.meal.edit.status,
        errorCode: state.meal.edit.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editMealRequest: (id, mealname, calorie) => {
            return dispatch(editMealRequest(id, mealname, calorie));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealEdit);
