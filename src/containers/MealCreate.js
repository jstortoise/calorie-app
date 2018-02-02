import React from 'react';
import { connect } from 'react-redux';
import { Meal } from '../components';
import { createMealRequest } from '../actions/meal';

class MealCreate extends React.Component {

    constructor(props) {
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleCreate(mealname, calorie) {
        return this.props.createMealRequest(mealname, calorie).then(
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
                <Meal mode={false} onCreate={this.handleCreate}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.meal.create.status,
        errorCode: state.meal.create.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createMealRequest: (mealname, calorie) => {
            return dispatch(createMealRequest(mealname, calorie));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealCreate);
