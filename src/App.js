import React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {
  HomePageComponent, 
  LoginPageComponent, 
  RegisterPageComponent
} from './pages';
import Toolbar from './components/Toolbar';
import {tryLogin} from './store/thunks';

class App extends React.Component {
  componentDidMount() {
    this.props.tryLogin();
  }

  render() {
    return (
      <Router>
        <div>
          <Toolbar />
  
          <Switch>
            <Route path="/" exact>
              <HomePageComponent />
            </Route>
  
            <Route path="/login">
              <LoginPageComponent />
            </Route>
  
            <Route path="/register">
              <RegisterPageComponent />
            </Route>
          </Switch>
          
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = {
  tryLogin
}

export default connect(null, mapDispatchToProps)(App);
