import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import DashBoard from './DashBoard';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Users from './Users';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        welcome to react
      </div>
      <DashBoard />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/home' component={Home} exact />
        <Route path='/users' component={Users} exact />
        <Route path='**' component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
