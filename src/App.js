import { BrowserRouter,Route,Switch } from 'react-router-dom';
import './App.css';
import Payroll from './components/payroll-form/Payroll-form';
import Dashboard from './components/dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
       <Switch>
         <Route exact path='/form' component={Payroll}></Route>
         <Route path='/' component={Dashboard}></Route>
         <Route exact path="/form/:id" component={Payroll}></Route>
       </Switch>
    </BrowserRouter>
  );
}

export default App;
