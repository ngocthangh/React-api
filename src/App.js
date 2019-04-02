import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';

class App extends Component {
    render() {
        return (

            <Router>
                <div>

                    <Menu />
                    <div className="container">

                        <div className="row">

                            {this.showContentMenus()}
                        </div>

                    </div>

                </div>
            </Router>

        );
    }
    showContentMenus() {
        var result = null;
        result = routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        ))
        return <Switch>{result}</Switch>
    }
}

export default App;
