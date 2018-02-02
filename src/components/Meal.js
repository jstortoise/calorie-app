import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchMealRequest } from '../actions/meal';

class Meal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mealname: '',
            calorie: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleCreate() {
        let mealname = this.state.mealname;
        let calorie = this.state.calorie;

        this.props.onCreate(mealname, calorie).then(
            (success) => {
                if (!success) {
                    this.setState({
                        mealname: '',
                        calorie: 0
                    });
                }
            }
        );
    }

    handleEdit() {
        let mealname = this.state.mealname;
        let calorie = this.state.calorie;

        this.props.onEdit(mealname, calorie).then(
            (success) => {
                if (!success) {
                    this.setState({
                        mealname: this.props.mealInfo.mealname,
                        calorie: this.props.mealInfo.calorie
                    });
                }
            }
        );
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            if (this.props.mode) {
                this.onEdit();
            } else {
                this.onCreate();
            }
        }
    }

    componentDidMount() {
        if (this.props.mode) {
            let id = this.props.mealId;
            this.props.searchMealRequest(id).then(
                () => {
                    if (this.props.search.status === 'SUCCESS') {
                        this.setState({
                            mealname: this.props.search.info.mealname,
                            calorie: this.props.search.info.calorie
                        });
                    } else {
                        console.error('Failed to load data');
                    }
                }
            )
        }
    }

    render() {
        const mealname_input = (
            <div className="input-field col s12 mealname">
                <label className="active">mealname</label>
                <input type="text" name="mealname" value={this.state.mealname} onChange={this.handleChange}/>
            </div>
        );
        const calorie_input = (
            <div>
                <div className="input-field col s12">
                    <label className="active">calorie</label>
                    <input type="number" name="calorie" onChange={this.handleChange} onKeyPress={this.handleKeyPress} value={this.state.calorie}/>
                </div>
            </div>
        );

        const createView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        { mealname_input }
                        { calorie_input }
                        <a onClick={this.handleCreate} className="waves-effect waves-light btn">CREATE</a>
                    </div>
                </div>
            </div>
        );

        const editView = (
            <div className="card-content">
                <div className="row">
                    { mealname_input }
                    { calorie_input }
                    <a onClick={this.handleEdit} className="waves-effect waves-light btn">UPDATE</a>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">
                            { !this.props.mode ?  "CREATE" : "UPDATE" }
                        </div>
                    </div>
                    { !this.props.mode ? createView : editView }
                </div>
            </div>
        );
    }
}

Meal.propTypes = {
    mode: PropTypes.bool,
    mealId: PropTypes.string,
    onCreate: PropTypes.func,
    onEdit: PropTypes.func
};

Meal.defaultProps = {
    mode: false,
    mealId: '',
    onCreate: (mealname, calorie) => { console.error ("onCreate is not defined."); },
    onEdit: (mealname, calorie) => { console.error ("onEdit is not defined."); }
}

const mapStateToProps = (state) => {
    return {
        search: state.meal.search
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchMealRequest: (id) => {
            return dispatch(searchMealRequest(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meal);
