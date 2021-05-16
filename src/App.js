import React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import {
  HomePageComponent, 
  LoginPageComponent, 
  RegisterPageComponent
} from './pages';
import Toolbar from './components/Toolbar';
import {Modal} from './components/ui';
import PublicRoute from './guards/PublicRoute';
import PrivateRoute from './guards/PrivateRoute';
import {tryLogin} from './store/thunks/auth';

class App extends React.Component {
  componentDidMount() {
    this.props.tryLogin();
  }

  render() {
    return (
      <Router>
        <div>
          <Toolbar />

          {this.props.isModalOpen && <Modal />}
  
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>

            <PrivateRoute path="/home" exact>
              <HomePageComponent />
            </PrivateRoute>
  
            <PublicRoute path="/login">
              <LoginPageComponent />
            </PublicRoute>
  
            <PublicRoute path="/register">
              <RegisterPageComponent />
            </PublicRoute>
          </Switch>
          
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isModalOpen: state.ui.isModalOpen
})

const mapDispatchToProps = {
  tryLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
