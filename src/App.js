import React from 'react';
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


function App() {
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

export default App;
