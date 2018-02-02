import React from 'react';
import { Settings } from '../components';
import { connect } from 'react-redux';
import { settingRequest } from '../actions/user';

class Setting extends React.Component {

    constructor(props) {
        super(props);
        this.handleSetting = this.handleSetting.bind(this);
    }

    handleSetting(calorie) {
        return this.props.settingRequest(calorie).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    Materialize.toast('Success!', 2000);
                    this.props.history.push('/meals');
                    return true;
                } else {
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
                <Settings onSetting={this.handleSetting}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.user.setting.status,
        errorCode: state.user.setting.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        settingRequest: (calorie) => {
            return dispatch(settingRequest(calorie));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
