import { BrowserRouter,Route,Switch } from 'react-router-dom';
import './App.css';
import Payroll from './components/payroll-form/Payroll-form';
import Dashboard from './components/dashboard/Dashboard';
import SimpleArrayOfObjectsComponent from './components/Practice/SimpleArrayOfObjectsComponent';
//import Practice from './components/Practice/SimpleArrayOfObjectsComponent'

function App() {
  return (
    <BrowserRouter>
       <Switch>
       <Route path='/com' component={SimpleArrayOfObjectsComponent}></Route>
         <Route exact path='/form' component={Payroll}></Route>
         <Route path='/' component={Dashboard}></Route>
         <Route exact path="/form/:id" component={Payroll}></Route>
        
       </Switch>
    </BrowserRouter>
  );
}

export default App;
