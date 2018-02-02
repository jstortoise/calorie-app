import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchUserRequest } from '../actions/user';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            calorie: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(
            (success) => {
                if (!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleRegister() {
        let username = this.state.username;
        let password = this.state.password;
        let calorie = this.state.calorie;

        this.props.onRegister(username, password, calorie).then(
            (success) => {
                if (!success) {
                    this.setState({
                        username: '',
                        password: '',
                        calorie: 0
                    });
                }
            }
        );
    }

    handleEdit() {
        let username = this.state.username;
        let password = this.state.password;
        let calorie = this.state.calorie;

        this.props.onEdit(username, password, calorie).then(
            (success) => {
                if (!success) {
                    this.setState({
                        username: '',
                        password: '',
                        calorie: 0
                    });
                }
            }
        );
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            if (this.props.mode === 0) {
                this.handleLogin();
            } else if (this.props.mode === 3) {
                this.handleEdit();
            } else {
                this.handleRegister();
            }
        }
    }

    componentDidMount() {
        if (this.props.mode == 3) {
            let id = this.props.userId;
            this.props.searchUserRequest(id).then(
                () => {
                    if (this.props.search.status === 'SUCCESS') {
                        this.setState({
                            username: this.props.search.info.username,
                            password: this.props.search.info.password,
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
        const username_input = (
            <div className="input-field col s12 username">
                <label className="active">Username</label>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            </div>
        );
        const password_input = (
            <div>
                <div className="input-field col s12">
                    <label className="active">Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                </div>
            </div>
        );
        const calorie_input = (
            <div>
                <div className="input-field col s12">
                    <label className="active">Daily Calorie</label>
                    <input type="number" name="calorie" value={this.state.calorie} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        { username_input }
                        { password_input }
                        <a onClick={this.handleLogin} className="waves-effect waves-light btn">SUBMIT</a>
                    </div>
                </div>


                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>

            </div>
        );

        const registerView = (
            <div className="card-content">
                <div className="row">
                    { username_input }
                    { password_input }
                    { calorie_input }
                    <a onClick={this.handleRegister} className="waves-effect waves-light btn">CREATE</a>
                </div>
            </div>
        );

        const editView = (
            <div className="card-content">
                <div className="row">
                    { username_input }
                    { password_input }
                    { calorie_input }
                    <a onClick={this.handleEdit} className="waves-effect waves-light btn">UPDATE</a>
                </div>
            </div>
        );

        const getTextByMode = () => {
            switch(this.props.mode) {
                case 0:
                    return "LOGIN";
                case 1:
                    return "REGISTER";
                case 2:
                    return "CREATE";
                case 3:
                    return "UPDATE";
                default:
                    return "LOGIN";
            }
        }

        const getViewByMode = () => {
            switch(this.props.mode) {
                case 0:
                    return loginView;
                case 1:
                    return registerView;
                case 2:
                    return registerView;
                case 3:
                    return editView;
                default:
                    return loginView;
            }
        }

        return (
            <div className="container auth">
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">
                            {getTextByMode()}
                        </div>
                    </div>
                    {getViewByMode()}
                </div>
            </div>
        );
    }
}

User.propTypes = {
    mode: PropTypes.number,
    userId: PropTypes.string,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func,
    onEdit: PropTypes.func
};

User.defaultProps = {
    mode: 0,
    userId: '',
    onLogin: (username, password) => { console.error ("onLogin is not defined."); },
    onRegister: (username, password, calorie) => { console.error ("onRegister is not defined."); },
    onEdit: (username, password, calorie) => { console.error ("onEdit is not defined."); }
}

const mapStateToProps = (state) => {
    return {
        search: state.user.search
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchUserRequest: (id) => {
            return dispatch(searchUserRequest(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
