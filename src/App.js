import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import {
    Common,
    Login,
    Register,
    UserList,
    UserCreate,
    UserEdit,
    MealCreate,
    MealEdit,
    MealList,
    Setting,
    NotMatch
} from './containers';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Common>
                                <div className="container">
                                    <Route exact path="/users" component={UserList}/>
                                    <Route path="/users/create" component={UserCreate}/>
                                    <Route path="/users/edit/:id" component={UserEdit}/>
                                    <Route exact path="/meals" component={MealList}/>
                                    <Route path="/meals/create" component={MealCreate}/>
                                    <Route path="/meals/edit/:id" component={MealEdit}/>
                                    <Route path="/setting" component={Setting}/>
                                </div>
                            </Common>
                            <Route component={NotMatch}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
