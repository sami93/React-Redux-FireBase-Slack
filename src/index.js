import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import * as serviceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import firebase from './firebase';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setUser, clearUser } from './redux/actions';
import rootReducer from './redux/reducers';
import Spinner from './UI/Spinner/Spinner';
const store = createStore(rootReducer, composeWithDevTools());
class Root extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // console.log(user);
                this.props.setUser(user);
                this.props.history.push('/');
            } else {
                // user not found 
                this.props.history.push('/login');
                // new action
                this.props.clearUser();

            }
        })
    }

    render() {
        return this.props.isLoading ? <Spinner /> : (
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        )
    }


}

//video 14
const mapStateToProps = state => ({
    isLoading: state.user.isLoading
});

//video 12
const RootWithAuth = withRouter(connect(mapStateToProps, { setUser, clearUser })(Root));
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootWithAuth />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
