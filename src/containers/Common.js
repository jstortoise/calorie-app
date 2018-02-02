import React from 'react';
import { Header } from 'components';

class Common extends React.Component {

    render() {
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                { isAuth ? undefined : <Header/> }
                { this.props.children }
            </div>
        );

    }
}

export default Common;
